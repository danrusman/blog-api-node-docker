const Teacher = require('../models/Teacher');

module.exports = {
  // GET /teachers
  async index(req, res) {
    try {
      const teachers = await Teacher.find();
      return res.status(200).json(teachers);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao buscar professores', detalhe: error.message });
    }
  },

  // GET /teachers/:id
  async show(req, res) {
    try {
      const { id } = req.params;
      const teacher = await Teacher.findById(id);

      if (!teacher) {
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      return res.status(200).json(teacher);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao buscar dados do professor', detalhe: error.message });
    }
  },

  // POST /teachers - Cadastro
  async store(req, res) {
    try {
      const { nome, email, departamento, senha } = req.body;

      // Validação simples para garantir que a senha foi enviada no cadastro
      if (!senha) {
        return res.status(400).json({ error: 'A senha é obrigatória para o cadastro' });
      }

      const teacherExists = await Teacher.findOne({ email });
      if (teacherExists) {
        return res.status(400).json({ error: 'Este e-mail já está cadastrado' });
      }

      const teacher = await Teacher.create({ nome, email, departamento, senha });
      return res.status(201).json(teacher);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao cadastrar professor', detalhe: error.message });
    }
  },

  // PUT /teachers/:id
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, departamento } = req.body;

      const teacher = await Teacher.findByIdAndUpdate(
        id,
        { nome, email, departamento },
        { new: true, runValidators: true }
      );

      if (!teacher) {
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      return res.status(200).json(teacher);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar professor', detalhe: error.message });
    }
  },

  // DELETE /teachers/:id
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const teacher = await Teacher.findByIdAndDelete(id);

      if (!teacher) {
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      return res.status(200).json({ message: 'Professor excluído com sucesso' });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao excluir professor', detalhe: error.message });
    }
  },

  // 👇 ADICIONE ESTE NOVO MÉTODO ABAIXO PARA FAZER A AUTENTICAÇÃO REAL NO BANCO
  // POST /teachers/login
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
      }

      // O .select('+senha') força o Mongoose a carregar a senha que marcamos ocultada no Model
      const teacher = await Teacher.findOne({ email }).select('+senha');

      // Erro 404 genérico solicitado por você caso o e-mail não bata
      if (!teacher) {
        return res.status(404).json({ error: 'Senha incorreta ou professor não cadastrado' });
      }

      // Compara a senha crua enviada com a armazenada
      if (teacher.senha !== senha) {
        return res.status(401).json({ error: 'Senha incorreta ou professor não cadastrado' });
      }

      // Retorna sucesso e dados limpos do professor para o React Native
      return res.status(200).json({
        message: 'Login bem-sucedido',
        teacher: {
          id: teacher._id,
          nome: teacher.nome,
          email: teacher.email,
          departamento: teacher.departamento
        }
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno ao realizar login', detalhe: error.message });
    }
  }
};
