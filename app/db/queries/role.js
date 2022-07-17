export default {
  createRole: `
    INSERT INTO admin_role (name, permissions, description)
    VALUES ($1, $2, $3)
    RETURNING id;
  `,
  editRole: `
    UPDATE admin_role
    SET name = $/name/, permissions = $/permissions/, updated_at = now(), description = $/description/
    WHERE id = $/id/ AND NOT name = 'super_admin'
    RETURNING id
  `,
  getRoleById: `
    SELECT id, name, permissions, description FROM admin_role
    WHERE id = $1
  `,

  getRoles: `
    SELECT id, name, permissions, updated_at, description
    FROM admin_role
    WHERE NOT name = 'super_admin'
    ORDER BY updated_at DESC
    OFFSET $1
    LIMIT $2;
  `,
  countRoles: `
    SELECT COUNT(id) FROM admin_role WHERE NOT name = 'super_admin'
  `,

  searchRoles: `
    SELECT id, name, permissions, updated_at, description
    FROM admin_role
    WHERE name ILIKE $3 AND NOT name = 'super_admin'
    ORDER BY updated_at DESC
    OFFSET $1
    LIMIT $2;
  `,

  countRolesBySearch: `
    SELECT COUNT(id) FROM admin_role
    WHERE name ILIKE $1 AND NOT name = 'super_admin'
  `,

  deleteRole: `
    DELETE FROM admin_role WHERE id = $1 AND NOT (name = 'super_admin' OR name = 'guest')
    RETURNING id
  `,

  getAllRoles: 'SELECT id, name FROM admin_role ORDER BY updated_at DESC'
};
