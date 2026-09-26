import SessionsService from '../services/sessions.service.js';

class SessionsController {
  async register(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;
      const result = await SessionsService.register({ first_name, last_name, email, password });
      return res.status(201).json({ status: 'success', payload: result });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ status: 'error', message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
      }

      const result = await SessionsService.login(email, password);

      if (!result) {
        return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
      }

      res.cookie('currentUser', result.token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
      });

      return res.status(200).json({ status: 'success', message: 'Login correcto' });
    } catch (error) {
      return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
    }
  }

  current(req, res) {
    return res.status(200).json({ status: 'success', payload: req.user });
  }

  logout(req, res) {
    res.clearCookie('currentUser', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({ status: 'success', message: 'Sesión cerrada' });
  }
}

export default new SessionsController();
