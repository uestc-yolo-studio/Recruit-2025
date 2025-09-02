// 简单的hash加密工具函数 - 基于固定种子生成一致的hash
export const hashString = (str) => {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  
  // 使用固定种子确保每次生成相同的hash
  const seed = 20250908; // 使用招新日期作为种子
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // 添加种子确保一致性
  hash = hash ^ seed;
  
  // 转换为16进制
  const hexHash = Math.abs(hash).toString(16);
  
  // 添加一些固定的混淆字符
  const fixedSuffix = 'yolo2025';
  
  return `${hexHash}${fixedSuffix}`;
};

// 生成加密后的路由路径
export const getEncryptedRoute = () => {
  const originalRoute = 'yolo-2025-recruit-secret-access-0908';
  return `/${hashString(originalRoute)}`;
};

// 验证路由是否匹配（用于调试）
export const verifyRoute = (route) => {
  const originalRoute = 'yolo-2025-recruit-secret-access-0908';
  const expectedHash = hashString(originalRoute);
  return route.includes(expectedHash);
};
