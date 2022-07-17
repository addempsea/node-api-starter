INSERT INTO admin_role(name, description, permissions)
VALUES ( 'super_admin',
         'Administrator',
         '{}'), ( 'guest',
                  'Administrator',
                  '{}') ON CONFLICT (name) DO NOTHING;


INSERT INTO admin_info(id, first_name, last_name, email, password, salt, role_id)
VALUES ('d1b6ebaa11ec02427777e',
        'api',
        'admin',
        'admin@api.io',
        'eb1331800f5a7697e690a104e83a4001e20bd3aef8b5d8d002fb322cd8412951',
        '$2b$10$b03Z1LdBOs3jpgpHutvCue',
        1) ON CONFLICT (id) DO NOTHING;

