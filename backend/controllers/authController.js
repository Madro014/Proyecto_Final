const User = require('../models/User'); // Asegúrate que la ruta sea correcta
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body; // Añadir username aquí

    // Verificar si el usuario ya existe por email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
    }

    // Verificar si el nombre de usuario ya existe
    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
    }

    // Crear nuevo usuario (la contraseña se hashea en el pre-save hook del modelo)
    user = new User({ name, email, password, username }); // Añadir username aquí
    await user.save();

    // Crear token JWT
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, username: user.username } // Devolver username también
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor al registrar el usuario.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    // Comparar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    // Crear token JWT
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor al iniciar sesión.' });
  }
};