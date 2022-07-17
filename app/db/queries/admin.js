export default {
  fetchAdminByEmail: `
    SELECT ai.id, first_name, email, last_name, salt, password, ar.name AS role_name, permissions, image_url 
    FROM admin_info ai
    JOIN admin_role ar
    ON ai.role_id = ar.id
    WHERE email = $1;
  `,

  fetchAdminById: `
    SELECT ai.id, first_name, email, last_name, salt, password, ar.name AS role_name, permissions, image_url 
    FROM admin_info ai
    JOIN admin_role ar
    ON ai.role_id = ar.id
    WHERE ai.id = $1;
  `,

  updateAdmin: `
    UPDATE admin_info SET first_name=$/firstName/, last_name=$/lastName/, updated_at=NOW(), image_url=$/imageUrl/ 
    WHERE id=$/id/ RETURNING id, first_name, last_name, image_url`,

  updateAdminPassword: `UPDATE admin_info SET password=$1, salt=$2, updated_at=NOW() WHERE email = $3
  RETURNING id, first_name, last_name, email`,

};
