export class UserFriendlyError extends Error {
  statusCode?: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
  }
}

export class Error400Invalid extends UserFriendlyError {
  constructor() {
    super(400, "Invalid request");
  }
}

export class Error401Unauthorised extends UserFriendlyError {
  constructor() {
    super(401, "Unauthorised request");
  }
}

export class Error403Forbidden extends UserFriendlyError {
  constructor() {
    super(403, "Access denied");
  }
}

export class Error404NotFound extends UserFriendlyError {
  constructor() {
    super(404, "Not found");
  }
}

export class Error500 extends UserFriendlyError {
  constructor() {
    super(500, "Internal server error");
  }
}
