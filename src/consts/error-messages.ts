export const ERROR_MESSAGES = {
  general: "Произошла ошибка при выполнении запроса",
  validation_errors: "Произошла ошибка валидации данных",
  incorrect_credentials: "Неверный логин или пароль",
  could_not_delete_request: 'Заявка в статусе "Done" не может быть удалена',
  request_non_writeable: 'Нельзя изменить заявку в статусе "Done"',
  missing_auth_token: "Нельзя выполнять запрос неавторизованным пользователям",
  invalid_token_payload: "Неверный формать авторизационного токена",
  invalid_token:
    "Срок жизни авторизационного токена истек. Попробуйте зайти в аккаунт заново",
  could_not_create_request: "Не удалось создать заявку. Попробуйте позже",
  id_not_found: "Пользователь с таким ID не найден",
  request_not_found: "Заявка с таким ID не найдена",
};
