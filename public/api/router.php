<?php
// ========================================================
// InfosBrain — Universal CMS & Public API Backend
// Supports SQLite DB & Static JSON Synchronization
// ========================================================

// Prevent PHP error leakage in JSON output
error_reporting(E_ALL);
ini_set('display_errors', '0');

// CORS and Cache-Control headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Cache-Control: no-cache, no-store, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Locate SQLite Database
$possibleDbPaths = [
    __DIR__ . '/../../data/infosbrain.db',
    __DIR__ . '/../data/infosbrain.db',
    dirname(__DIR__, 2) . '/data/infosbrain.db',
    dirname(__DIR__) . '/data/infosbrain.db',
    __DIR__ . '/infosbrain.db',
];

$dbPath = null;
foreach ($possibleDbPaths as $p) {
    if (file_exists($p)) {
        $dbPath = $p;
        break;
    }
}

if (!$dbPath) {
    // Attempt creating in default directory
    $primaryDataDir = __DIR__ . '/../../data';
    if (!is_dir($primaryDataDir)) {
        @mkdir($primaryDataDir, 0755, true);
    }
    $dbPath = $primaryDataDir . '/infosbrain.db';
}

$db = null;
try {
    $db = new PDO('sqlite:' . $dbPath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->exec('PRAGMA journal_mode = WAL;');
    $db->exec('PRAGMA foreign_keys = ON;');
    
    // Ensure team_members table exists
    $db->exec("
        CREATE TABLE IF NOT EXISTS team_members (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            qualification TEXT,
            designation TEXT NOT NULL,
            bio TEXT,
            profileImage TEXT,
            linkedinUrl TEXT,
            achievements TEXT DEFAULT '[]',
            skills TEXT DEFAULT '[]',
            category TEXT DEFAULT 'leadership',
            displayOrder INTEGER DEFAULT 0,
            status TEXT DEFAULT 'published',
            createdAt TEXT,
            updatedAt TEXT
        );
    ");

    $count = intval($db->query("SELECT COUNT(*) FROM team_members")->fetchColumn());
    if ($count === 0) {
        $seedStmt = $db->prepare("
            INSERT INTO team_members (
                id, name, qualification, designation, bio, profileImage, linkedinUrl,
                achievements, skills, category, displayOrder, status, createdAt, updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $now = gmdate('c');
        $initial = [
            [
                'lead-1', 'Elena Vance, Ph.D.', 'Ph.D. in Computer Science & AI Ethics', 'Founder & Global Managing Director',
                'Pioneered human-centric AI and digital transformation frameworks with over 15 years advising global enterprises, academic institutions, and NGOs on technology-driven growth.',
                'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=600&q=80',
                'https://linkedin.com',
                json_encode(['Chaired international digital transformation steering committees', 'Published researcher in responsible AI architecture and ethical governance', 'Architected modern technology strategies across 20+ countries']),
                json_encode(['AI Strategy', 'Digital Transformation', 'Enterprise Governance']),
                'leadership', 1, 'published', $now, $now
            ],
            [
                'lead-2', 'Marcus Sterling', 'M.Sc. Enterprise Systems, Harvard Alumni', 'Chief Executive Officer (CEO)',
                'Leads global operations, strategic alliances, and commercial delivery. Former senior technology executive driving multi-million-dollar software and cloud initiatives.',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
                'https://linkedin.com',
                json_encode(['Scaled high-performance software engineering teams across 3 continents', 'Spearheaded enterprise modernization partnerships for FTSE & Fortune 500 orgs', 'Advocate for cross-border technology accessibility and responsible AI adoption']),
                json_encode(['Global Operations', 'Commercial Strategy', 'Cloud Leadership']),
                'leadership', 2, 'published', $now, $now
            ],
            [
                'lead-3', 'Tariq Al-Mansoor', 'M.Eng. Distributed Systems & Security', 'Chief Technology Officer (CTO)',
                'Oversees software engineering, R&D centers, and cloud infrastructure. Specializes in distributed microservices, zero-trust cybersecurity, and deep neural models.',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
                'https://linkedin.com',
                json_encode(['Engineered high-throughput cloud platforms handling millions of transactions daily', 'Certified cloud architect (AWS Solutions Architect Pro & Azure Solutions Expert)', 'Led proprietary R&D in computer vision and document intelligence models']),
                json_encode(['Microservices', 'Zero-Trust Architecture', 'Deep Learning']),
                'leadership', 3, 'published', $now, $now
            ],
            [
                'lead-4', 'Dr. Kwame Osei-Bonsu', 'D.Phil. Public Policy & Digital Systems', 'Strategic Advisory Board Chair',
                'Senior advisor on international technology policy, institutional digital capacity building, and public-sector digital service transformation.',
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
                'https://linkedin.com',
                json_encode(['Advised international development banks and regional governments', 'Fellow of the Global Institute for Digital Transformation', 'Championed sustainable digital infrastructure for underserved economies']),
                json_encode(['Public Sector Tech', 'Policy & Governance', 'Digital Capacity']),
                'leadership', 4, 'published', $now, $now
            ],
            [
                'tm-1', 'Elena Vance [Practice Lead]', 'Lead Growth Strategist', 'Principal Digital Strategist & Co-Founder',
                '12+ years orchestrating digital growth strategies, brand scaling, and technology initiatives for international businesses.',
                'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=400&q=80',
                'https://linkedin.com',
                json_encode(['Delivered 350% average client ROI across digital transformation engagements']),
                json_encode(['Growth Strategy', 'Brand Architecture', 'CRO']),
                'team', 5, 'published', $now, $now
            ],
            [
                'tm-2', 'Kaelen Thorne [Practice Lead]', 'Principal Systems Architect', 'Head of Web Engineering & Architecture',
                'Full-stack systems architect specializing in high-throughput MERN, headless Next.js platforms, and cloud resilience.',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
                'https://linkedin.com',
                json_encode(['Architected scalable SaaS backends handling 50k+ daily concurrent users']),
                json_encode(['MERN Stack', 'Next.js', 'System Architecture']),
                'team', 6, 'published', $now, $now
            ],
            [
                'tm-3', 'Nadia Chen [Practice Lead]', 'Director of Search Science', 'Director of Performance Media & SEO',
                'Data-driven performance marketer with expertise in algorithmic search optimization and multi-million dollar paid campaigns.',
                'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
                'https://linkedin.com',
                json_encode(['Ranked 400+ competitive commercial keywords on Google Page 1']),
                json_encode(['Technical SEO', 'Google Ads', 'Meta CAPI']),
                'team', 7, 'published', $now, $now
            ],
            [
                'tm-4', 'Liam Sterling [Practice Lead]', 'Creative Director', 'Creative Director & Brand Designer',
                'Award-winning visual designer shaping cyber-modern design systems, high-converting UI/UX, and distinctive digital identities.',
                'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
                'https://linkedin.com',
                json_encode(['Redesigned 50+ enterprise and consumer digital brand identities']),
                json_encode(['UI/UX Systems', 'Futuristic Visuals', 'Motion']),
                'team', 8, 'published', $now, $now
            ],
        ];
        foreach ($initial as $row) {
            $seedStmt->execute($row);
        }
    }
} catch (Exception $e) {
    // If SQLite fails, database will remain null and fallback to JSON files
    $db = null;
}

// Category normalization
function normalizeCategory($cat) {
    if (!$cat) return 'leadership';
    $c = strtolower(trim((string)$cat));
    if (
        str_contains($c, 'leadership') ||
        str_contains($c, 'executive') ||
        str_contains($c, 'showcase') ||
        $c === 'lead' ||
        $c === 'director'
    ) {
        return 'leadership';
    }
    return 'team';
}

// Format team member row
function formatMember($row) {
    $achievements = [];
    if (!empty($row['achievements'])) {
        $decoded = json_decode($row['achievements'], true);
        if (is_array($decoded)) $achievements = $decoded;
    }
    $skills = [];
    if (!empty($row['skills'])) {
        $decoded = json_decode($row['skills'], true);
        if (is_array($decoded)) $skills = $decoded;
    }
    $cat = normalizeCategory($row['category'] ?? 'leadership');
    return [
        'id' => (string)($row['id'] ?? ''),
        'name' => (string)($row['name'] ?? ''),
        'qualification' => (string)($row['qualification'] ?? ''),
        'designation' => (string)($row['designation'] ?? ''),
        'role' => (string)($row['designation'] ?? ''),
        'bio' => (string)($row['bio'] ?? ''),
        'profileImage' => (string)($row['profileImage'] ?? ''),
        'imageUrl' => (string)($row['profileImage'] ?? ''),
        'linkedinUrl' => (string)($row['linkedinUrl'] ?? ''),
        'achievements' => $achievements,
        'skills' => $skills,
        'category' => $cat,
        'displayOrder' => intval($row['displayOrder'] ?? 0),
        'status' => (string)($row['status'] ?? 'published'),
        'createdAt' => (string)($row['createdAt'] ?? ''),
        'updatedAt' => (string)($row['updatedAt'] ?? ''),
    ];
}

// Sync helper to update static team.json files whenever a change occurs
function syncStaticTeam($db) {
    if (!$db) return;
    try {
        $stmt = $db->query("
            SELECT * FROM team_members
            WHERE LOWER(status) IN ('published', 'active', 'visible')
               OR status IS NULL
            ORDER BY displayOrder ASC, createdAt ASC
        ");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $members = array_map('formatMember', $rows);
        $leadership = array_values(array_filter($members, fn($m) => $m['category'] === 'leadership'));
        $teamMembers = array_values(array_filter($members, fn($m) => $m['category'] === 'team'));

        $payload = [
            'members' => $members,
            'leadership' => $leadership,
            'teamMembers' => $teamMembers,
        ];
        $json = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

        $destinations = [
            __DIR__ . '/team.json',
            __DIR__ . '/team',
            __DIR__ . '/../../public/api/team.json',
            __DIR__ . '/../../dist/api/team.json',
            __DIR__ . '/../../dist/api/team',
        ];
        foreach ($destinations as $dest) {
            $dir = dirname($dest);
            if (is_dir($dir) && is_writable($dir)) {
                @file_put_contents($dest, $json);
            }
        }
    } catch (Exception $e) {}
}

// Parse request route
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);

// Normalize route (e.g. /api/team, /api/team/admin, /api/team/admin/tm_123)
$route = preg_replace('#^/+#', '', $requestUri);
$route = preg_replace('#\.json$#', '', $route);
$route = rtrim($route, '/');

// Handle GET /api/team
if (($route === 'api/team' || $route === 'api/public/team') && $method === 'GET') {
    if ($db) {
        $stmt = $db->query("
            SELECT * FROM team_members
            WHERE LOWER(status) IN ('published', 'active', 'visible')
               OR status IS NULL
            ORDER BY displayOrder ASC, createdAt ASC
        ");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $members = array_map('formatMember', $rows);
    } else {
        $fallbackFile = __DIR__ . '/team.json';
        $content = file_exists($fallbackFile) ? file_get_contents($fallbackFile) : null;
        $parsed = $content ? json_decode($content, true) : null;
        $members = $parsed['members'] ?? [];
    }

    $leadership = array_values(array_filter($members, fn($m) => $m['category'] === 'leadership'));
    $teamMembers = array_values(array_filter($members, fn($m) => $m['category'] === 'team'));

    echo json_encode([
        'members' => $members,
        'leadership' => $leadership,
        'teamMembers' => $teamMembers,
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

// Handle GET /api/team/admin
if ($route === 'api/team/admin' && $method === 'GET') {
    if ($db) {
        $stmt = $db->query("
            SELECT * FROM team_members
            ORDER BY displayOrder ASC, createdAt DESC
        ");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $members = array_map('formatMember', $rows);
    } else {
        $fallbackFile = __DIR__ . '/team.json';
        $content = file_exists($fallbackFile) ? file_get_contents($fallbackFile) : null;
        $parsed = $content ? json_decode($content, true) : null;
        $members = $parsed['members'] ?? [];
    }

    echo json_encode(['members' => $members], JSON_UNESCAPED_SLASHES);
    exit;
}

// Handle POST /api/team/admin (Create new team member)
if ($route === 'api/team/admin' && $method === 'POST') {
    $raw = file_get_contents('php://input');
    $input = json_decode($raw, true) ?? [];

    $name = trim($input['name'] ?? '');
    $designation = trim($input['designation'] ?? $input['role'] ?? '');

    if (!$name) {
        http_response_code(400);
        echo json_encode(['error' => 'Name is required']);
        exit;
    }
    if (!$designation) {
        http_response_code(400);
        echo json_encode(['error' => 'Designation / Role is required']);
        exit;
    }

    $id = 'tm_' . base_convert((string)round(microtime(true) * 1000), 10, 36) . '_' . substr(bin2hex(random_bytes(3)), 0, 4);
    $now = gmdate('c');
    $cat = normalizeCategory($input['category'] ?? 'leadership');
    $achievements = json_encode(array_values(array_filter($input['achievements'] ?? [], fn($a) => is_string($a) && trim($a) !== '')));
    $skills = json_encode(array_values(array_filter($input['skills'] ?? [], fn($s) => is_string($s) && trim($s) !== '')));
    $displayOrder = intval($input['displayOrder'] ?? 0);
    $status = strtolower(trim($input['status'] ?? 'published'));
    $qual = trim($input['qualification'] ?? '');
    $bio = trim($input['bio'] ?? '');
    $img = trim($input['profileImage'] ?? $input['imageUrl'] ?? '');
    $linkedin = trim($input['linkedinUrl'] ?? '');

    if ($db) {
        $stmt = $db->prepare("
            INSERT INTO team_members (
                id, name, qualification, designation, bio, profileImage, linkedinUrl,
                achievements, skills, category, displayOrder, status, createdAt, updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $id, $name, $qual, $designation, $bio, $img, $linkedin,
            $achievements, $skills, $cat, $displayOrder, $status, $now, $now
        ]);
        syncStaticTeam($db);
    }

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'member' => [
            'id' => $id,
            'name' => $name,
            'qualification' => $qual,
            'designation' => $designation,
            'role' => $designation,
            'bio' => $bio,
            'profileImage' => $img,
            'imageUrl' => $img,
            'linkedinUrl' => $linkedin,
            'achievements' => json_decode($achievements, true),
            'skills' => json_decode($skills, true),
            'category' => $cat,
            'displayOrder' => $displayOrder,
            'status' => $status,
            'createdAt' => $now,
            'updatedAt' => $now,
        ],
        'message' => 'Team member created successfully',
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

// Handle PUT /api/team/admin/{id} (Update team member)
if (preg_match('#^api/team/admin/([^/]+)$#', $route, $matches) && $method === 'PUT') {
    $targetId = $matches[1];
    $raw = file_get_contents('php://input');
    $input = json_decode($raw, true) ?? [];

    $name = trim($input['name'] ?? '');
    $designation = trim($input['designation'] ?? $input['role'] ?? '');

    if (!$name) {
        http_response_code(400);
        echo json_encode(['error' => 'Name is required']);
        exit;
    }
    if (!$designation) {
        http_response_code(400);
        echo json_encode(['error' => 'Designation / Role is required']);
        exit;
    }

    $now = gmdate('c');
    $cat = normalizeCategory($input['category'] ?? 'leadership');
    $achievements = json_encode(array_values(array_filter($input['achievements'] ?? [], fn($a) => is_string($a) && trim($a) !== '')));
    $skills = json_encode(array_values(array_filter($input['skills'] ?? [], fn($s) => is_string($s) && trim($s) !== '')));
    $displayOrder = intval($input['displayOrder'] ?? 0);
    $status = strtolower(trim($input['status'] ?? 'published'));
    $qual = trim($input['qualification'] ?? '');
    $bio = trim($input['bio'] ?? '');
    $img = trim($input['profileImage'] ?? $input['imageUrl'] ?? '');
    $linkedin = trim($input['linkedinUrl'] ?? '');

    if ($db) {
        $stmt = $db->prepare("
            UPDATE team_members SET
                name = ?, qualification = ?, designation = ?, bio = ?, profileImage = ?,
                linkedinUrl = ?, achievements = ?, skills = ?, category = ?,
                displayOrder = ?, status = ?, updatedAt = ?
            WHERE id = ?
        ");
        $stmt->execute([
            $name, $qual, $designation, $bio, $img,
            $linkedin, $achievements, $skills, $cat,
            $displayOrder, $status, $now, $targetId
        ]);
        syncStaticTeam($db);
    }

    echo json_encode([
        'success' => true,
        'member' => [
            'id' => $targetId,
            'name' => $name,
            'qualification' => $qual,
            'designation' => $designation,
            'role' => $designation,
            'bio' => $bio,
            'profileImage' => $img,
            'imageUrl' => $img,
            'linkedinUrl' => $linkedin,
            'achievements' => json_decode($achievements, true),
            'skills' => json_decode($skills, true),
            'category' => $cat,
            'displayOrder' => $displayOrder,
            'status' => $status,
            'updatedAt' => $now,
        ],
        'message' => 'Team member updated successfully',
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

// Handle PATCH /api/team/admin/{id}/status (Toggle status)
if (preg_match('#^api/team/admin/([^/]+)/status$#', $route, $matches) && ($method === 'PATCH' || $method === 'PUT')) {
    $targetId = $matches[1];
    $raw = file_get_contents('php://input');
    $input = json_decode($raw, true) ?? [];
    $status = strtolower(trim($input['status'] ?? 'published'));
    $now = gmdate('c');

    if ($db) {
        $stmt = $db->prepare("UPDATE team_members SET status = ?, updatedAt = ? WHERE id = ?");
        $stmt->execute([$status, $now, $targetId]);
        syncStaticTeam($db);
    }

    echo json_encode(['success' => true, 'status' => $status]);
    exit;
}

// Handle DELETE /api/team/admin/{id} (Delete team member)
if (preg_match('#^api/team/admin/([^/]+)$#', $route, $matches) && $method === 'DELETE') {
    $targetId = $matches[1];

    if ($db) {
        $stmt = $db->prepare("DELETE FROM team_members WHERE id = ?");
        $stmt->execute([$targetId]);
        syncStaticTeam($db);
    }

    echo json_encode(['success' => true, 'message' => 'Team member deleted successfully']);
    exit;
}

// Handle GET /api/cms/all
if (($route === 'api/cms/all' || $route === 'api/cms') && $method === 'GET') {
    if ($db) {
        // 1. Team
        $stmt = $db->query("
            SELECT * FROM team_members
            WHERE LOWER(status) IN ('published', 'active', 'visible')
               OR status IS NULL
            ORDER BY displayOrder ASC, createdAt ASC
        ");
        $teamRows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $members = array_map('formatMember', $teamRows);

        // 2. Services
        $serviceRows = [];
        try {
            $sStmt = $db->query("SELECT * FROM services WHERE LOWER(status) = 'published' ORDER BY displayOrder ASC");
            $serviceRows = array_map(function($r) {
                return [
                    'id' => $r['id'],
                    'slug' => $r['slug'],
                    'title' => $r['title'],
                    'shortDescription' => $r['shortDescription'],
                    'fullDescription' => $r['fullDescription'],
                    'icon' => $r['icon'],
                    'featured' => (bool)$r['featured'],
                    'displayOrder' => (int)$r['displayOrder'],
                    'features' => !empty($r['features']) ? json_decode($r['features'], true) : [],
                    'benefits' => !empty($r['benefits']) ? json_decode($r['benefits'], true) : [],
                    'deliverables' => !empty($r['deliverables']) ? json_decode($r['deliverables'], true) : [],
                    'technologies' => !empty($r['technologies']) ? json_decode($r['technologies'], true) : [],
                    'process' => !empty($r['process']) ? json_decode($r['process'], true) : [],
                    'faqs' => !empty($r['faqs']) ? json_decode($r['faqs'], true) : [],
                ];
            }, $sStmt->fetchAll(PDO::FETCH_ASSOC));
        } catch (Exception $e) {}

        // 3. Testimonials
        $testimonials = [];
        try {
            $tStmt = $db->query("SELECT * FROM testimonials WHERE LOWER(status) = 'published' ORDER BY displayOrder ASC");
            $testimonials = $tStmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {}

        // 4. FAQs
        $faqs = [];
        try {
            $fStmt = $db->query("SELECT * FROM faqs WHERE LOWER(status) = 'published' ORDER BY displayOrder ASC");
            $faqs = $fStmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {}

        // 5. Locations
        $locations = [];
        try {
            $lStmt = $db->query("SELECT * FROM locations WHERE LOWER(status) = 'published' ORDER BY displayOrder ASC");
            $locations = array_map(function($r) {
                return [
                    'id' => $r['id'],
                    'name' => $r['name'],
                    'country' => $r['country'],
                    'flag' => $r['flag'],
                    'address' => $r['address'],
                    'email' => $r['email'],
                    'phone' => $r['phone'],
                    'timezone' => $r['timezone'],
                    'coordinates' => !empty($r['coordinates']) ? json_decode($r['coordinates'], true) : ['x' => 50, 'y' => 50],
                    'servicesProvided' => !empty($r['servicesProvided']) ? json_decode($r['servicesProvided'], true) : [],
                ];
            }, $lStmt->fetchAll(PDO::FETCH_ASSOC));
        } catch (Exception $e) {}

        // 6. Case Studies
        $caseStudies = [];
        try {
            $cStmt = $db->query("SELECT * FROM case_studies WHERE LOWER(status) = 'published' ORDER BY displayOrder ASC");
            $caseStudies = array_map(function($r) {
                return [
                    'id' => $r['id'],
                    'slug' => $r['slug'],
                    'title' => $r['title'],
                    'client' => $r['client'],
                    'clientIndustry' => $r['clientIndustry'],
                    'summary' => $r['summary'],
                    'heroImage' => $r['heroImage'],
                    'services' => !empty($r['services']) ? json_decode($r['services'], true) : [],
                    'results' => !empty($r['results']) ? json_decode($r['results'], true) : [],
                ];
            }, $cStmt->fetchAll(PDO::FETCH_ASSOC));
        } catch (Exception $e) {}

        // 7. Careers
        $careers = [];
        try {
            $carStmt = $db->query("SELECT * FROM careers WHERE LOWER(status) = 'published' ORDER BY displayOrder ASC");
            $careers = array_map(function($r) {
                return [
                    'id' => $r['id'],
                    'title' => $r['title'],
                    'department' => $r['department'],
                    'location' => $r['location'],
                    'type' => $r['type'],
                    'experienceLevel' => $r['experienceLevel'],
                    'overview' => $r['overview'],
                    'requirements' => !empty($r['requirements']) ? json_decode($r['requirements'], true) : [],
                    'responsibilities' => !empty($r['responsibilities']) ? json_decode($r['responsibilities'], true) : [],
                ];
            }, $carStmt->fetchAll(PDO::FETCH_ASSOC));
        } catch (Exception $e) {}

        // 8. Sections
        $sections = [];
        try {
            $secStmt = $db->query("SELECT * FROM sections ORDER BY displayOrder ASC");
            foreach ($secStmt->fetchAll(PDO::FETCH_ASSOC) as $s) {
                $sections[$s['sectionKey']] = array_merge($s, ['isVisible' => $s['status'] === 'visible']);
            }
        } catch (Exception $e) {}

        // 9. Settings
        $settings = [];
        try {
            $setStmt = $db->query("SELECT key, value FROM settings");
            foreach ($setStmt->fetchAll(PDO::FETCH_ASSOC) as $st) {
                $settings[$st['key']] = $st['value'];
            }
        } catch (Exception $e) {}

        echo json_encode([
            'members' => $members,
            'leadership' => array_values(array_filter($members, fn($m) => $m['category'] === 'leadership')),
            'teamMembers' => array_values(array_filter($members, fn($m) => $m['category'] === 'team')),
            'services' => $serviceRows,
            'testimonials' => $testimonials,
            'faqs' => $faqs,
            'locations' => $locations,
            'caseStudies' => $caseStudies,
            'careers' => $careers,
            'sections' => (object)$sections,
            'settings' => (object)$settings,
        ], JSON_UNESCAPED_SLASHES);
        exit;
    } else {
        $fallbackAll = __DIR__ . '/cms/all.json';
        if (file_exists($fallbackAll)) {
            readfile($fallbackAll);
            exit;
        }
    }
}

// Handle POST /api/auth/login
if ($route === 'api/auth/login' && $method === 'POST') {
    $raw = file_get_contents('php://input');
    $input = json_decode($raw, true) ?? [];
    $email = strtolower(trim($input['email'] ?? ''));
    $password = trim($input['password'] ?? '');

    // Check DB users if available
    $authenticated = false;
    $userRecord = null;
    if ($db) {
        try {
            $stmt = $db->prepare("SELECT * FROM users WHERE LOWER(email) = ?");
            $stmt->execute([$email]);
            $userRecord = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($userRecord && password_verify($password, $userRecord['passwordHash'])) {
                $authenticated = true;
            }
        } catch (Exception $e) {}
    }

    // Default admin fallback verification
    if (!$authenticated && $email === 'admin@infosbrain.com' && $password === 'Admin@123456') {
        $authenticated = true;
        $userRecord = [
            'id' => 'usr_admin',
            'email' => 'admin@infosbrain.com',
            'name' => 'InfosBrain Admin',
            'role' => 'admin',
        ];
    }

    if ($authenticated) {
        $token = 'auth_' . bin2hex(random_bytes(16));
        echo json_encode([
            'success' => true,
            'token' => $token,
            'user' => [
                'id' => $userRecord['id'] ?? 'usr_admin',
                'email' => $userRecord['email'] ?? $email,
                'name' => $userRecord['name'] ?? 'InfosBrain Admin',
                'role' => $userRecord['role'] ?? 'admin',
            ],
        ]);
        exit;
    }

    http_response_code(401);
    echo json_encode(['error' => 'Invalid email or password']);
    exit;
}

// Handle GET /api/auth/me
if ($route === 'api/auth/me' && $method === 'GET') {
    echo json_encode([
        'user' => [
            'id' => 'usr_admin',
            'email' => 'admin@infosbrain.com',
            'name' => 'InfosBrain Admin',
            'role' => 'admin',
        ],
    ]);
    exit;
}

// Handle POST /api/auth/logout
if ($route === 'api/auth/logout' && ($method === 'POST' || $method === 'GET')) {
    echo json_encode(['success' => true]);
    exit;
}

// Fallback for unhandled API routes
http_response_code(404);
echo json_encode(['error' => 'API endpoint not found', 'route' => $route]);
exit;
