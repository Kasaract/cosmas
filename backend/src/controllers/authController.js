const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Register user
const registerUser = async (req, res) => {
  // TODO: Change to first_name - Gary 1/20/25
  const { firstName, lastName, email, password } = req.body;

  // TODO: Check that email is formatted properly - Gary 1/20/25
  // TODO: Check PW is correct format - Gary 1/20/25
  // TODO: Check names are not empty - Gary 1/20/25
  // TODO: Configure email confirmation - Gary 1/20/25

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // TODO: Look into ES feature where you don't need to repeat variable to pass into obj? - Gary 1/20/25
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        firstName: firstName,
        lastName: lastName,
      },
    });

    if (error) throw error;

    res.status(201).json({ message: `User ${email} registered successfully`});
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // TODO: Check that email is formatted properly - Gary 1/20/25

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    const { access_token } = data.session;
    const user_id = data.user.id;

    res.status(200).json({ message: `User ${email} signed in successfully`, access_token, user_id });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

// Log out user
const logoutUser = async (req, res) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      res.status(401).json({ error: 'No authorization header provided' });
    }

    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    res.status(200).json({ message: 'User signed out successfully' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// Get user
const getUser = async (req, res) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      res.status(401).json({ error: 'No authorization header provided' });
    }

    const { data, error } = await supabase.auth.getUser(authorization.replace("Bearer ", ""));

    if (error) throw error;

    res.status(200).json({ user: data });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
}
