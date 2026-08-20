export const ENV = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/options_it_ltd',
  JWT_SECRET: process.env.JWT_SECRET || 'options_it_super_secure_jwt_secret_key_2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  SUPER_ADMIN_NAME: process.env.SUPER_ADMIN_NAME || 'Sakib',
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL || 'admin@optionsitld.com',
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD || 'SuperAdmin#OptionsIT2026!',
  SUPER_ADMIN_ROLE: process.env.SUPER_ADMIN_ROLE || 'super_admin',
  ADMIN_NOTIFICATION_EMAIL: process.env.ADMIN_NOTIFICATION_EMAIL || 'sakib.flc@gmail.com',
  ADMIN_WHATSAPP_NUMBER: process.env.ADMIN_WHATSAPP_NUMBER || '+8801806301888',
  WHATSAPP_API_TOKEN: process.env.WHATSAPP_API_TOKEN || ''
};
