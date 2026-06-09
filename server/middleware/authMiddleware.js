import jwt from 'jsonwebtoken';

// 1. JWT Authentication & 3. Tenant ID Extraction
export const verifyTokenAndTenant = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    // Verify the user's identity
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Extract the tenant ID (companyId) and user details
    req.user = {
      id: decoded.id,
      role: decoded.role,
      companyId: decoded.companyId 
    };

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or Expired Token' });
  }
};

// 2. Role-Based Access Control (RBAC)
export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient Permissions' });
    }
    next();
  };
};
