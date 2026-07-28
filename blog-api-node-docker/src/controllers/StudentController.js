const Student = require('../models/Student');

module.exports = {
  // GET /students
  async index(req, res) {
    try {
      const students = await Student.find().sort({ dataCriacao: -1 });
      return res.status(200).json(students);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar estudantes' });
    }
  },

  // GET /students/:id
  async show(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.findById(id);

      if (!student) {
        return res.status(404).json({ error: 'Estudante não encontrado' });
      }

      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar dados do estudante' });
    }
  },

  // POST /students - Cadastro
  async store(req, res) {
    try {
      const { nome, email, matricula, senha } = req.body;

      if (!senha) {
        return res.status(400).json({ error: 'A senha é obrigatória para o cadastro' });
      }

      const emailExists = await Student.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ error: 'Este e-mail já está cadastrado' });
      }

      const matriculaExists = await Student.findOne({ matricula });
      if (matriculaExists) {
        return res.status(400).json({ error: 'Esta matrícula já está cadastrada' });
      }

      // CORREÇÃO: Passado o campo senha para persistir no MongoDB
      const student = await Student.create({
        nome,
        email,
        matricula,
        senha 
      });

      return res.status(201).json(student);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao cadastrar estudante' });
    }
  },

  // PUT /students/:id
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, matricula, senha } = req.body;

      const student = await Student.findByIdAndUpdate(
        id,
        { nome, email, matricula, senha },
        { new: true, runValidators: true }
      );

      if (!student) {
        return res.status(404).json({ error: 'Estudante não encontrado' });
      }

      return res.status(200).json(student);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar estudante' });
    }
  },

  // DELETE /students/:id
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.findByIdAndDelete(id);

      if (!student) {
        return res.status(404).json({ error: 'Estudante não encontrado' });
      }

      return res.status(200).json({ message: 'Estudante excluído com sucesso' });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao excluir estudante' });
    }
  },

  // 👇 MÉTODO ADICIONADO: Executa a autenticação real de matrícula e senha
  // POST /students/login
  async login(req, res) {
    try {
      const { matricula, senha } = req.body;

      if (!matricula || !senha) {
        return res.status(400).json({ error: 'Matrícula e senha são obrigatórias' });
      }

      const student = await Student.findOne({ matricula }).select('+senha');

      if (!student) {
        return res.status(404).json({ error: 'Senha incorreta ou aluno não cadastrado' });
      }

      if (student.senha !== senha) {
        return res.status(401).json({ error: 'Senha incorreta ou aluno não cadastrado' });
      }

      return res.status(200).json({
        message: 'Login bem-sucedido',
        student: {
          id: student._id,
          nome: student.nome,
          email: student.email,
          matricula: student.matricula
        }
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno ao realizar login', detalhe: error.message });
    }
  }
};
