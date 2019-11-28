HandlerMethod handlerMethod=(HandlerMethod)object;
Method method=handlerMethod.getMethod();

if (method.isAnnotationPresent(PassToken.class)) {
    PassToken passToken = method.getAnnotation(PassToken.class);
    if (passToken.required()) {
        return true;
    }
}

if (method.isAnnotationPresent(UserLoginToken.class)) {
    UserLoginToken userLoginToken = method.getAnnotation(UserLoginToken.class);
    if (userLoginToken.required()) {

        if (token == null) {
            throw new RuntimeException(" no token");
        }
  
        String userId;
        try {
            userId = JWT.decode(token).getAudience().get(0);
        } catch (JWTDecodeException j) {
            throw new RuntimeException("401");
        }
        User user = userService.findUserById(userId);
        if (user == null) {
            throw new RuntimeException(“no  user”);
        }

        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(user.getPassword())).build();
        try {
            jwtVerifier.verify(token);
        } catch (JWTVerificationException e) {
            throw new RuntimeException("401");
        }
        return true;
    }
}
