const ROLES = {
  Admin: 'ROLE_ADMIN',
  Merchant: 'ROLE_MERCHANT',
  Member: 'ROLE_MEMBER'
};

const EMAIL_PROVIDER = {
  Email: 'Email',
  Google: 'Google',
  Facebook: 'Facebook'
};

const MERCHANT_STATUS = {
  Pending: 'Pending',
  Approved: 'Approved',
  Rejected: 'Rejected'
};

const CART_ITEM_STATUS = {
  InCart: 'InCart',
  Ordered: 'Ordered',
  Delivered: 'Delivered'
};

const JWT_COOKIE = 'token';

module.exports = {
  ROLES,
  EMAIL_PROVIDER,
  MERCHANT_STATUS,
  CART_ITEM_STATUS,
  JWT_COOKIE
};
