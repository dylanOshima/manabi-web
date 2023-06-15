/**
 * Auth roles for authentication
 */
enum AUTH_ROLES {
  // A logged out session.
  // This is the default for a given session.
  LOGGED_OUT,
  // A logged in session.
  // When the given session has been authenticated.
  LOGGED_IN,
  // Admin session.
  // Access to everything: all seeing, all knowing.
  ADMIN,
}

export default AUTH_ROLES;
