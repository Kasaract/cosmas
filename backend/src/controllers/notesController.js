const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// TODO: Make sure fields are not empty. - Gary 1/20/25
// TODO: Figure out how to pass access token to Supabase based on RLS policy (i.e. remove the user_id field)

// Get notes
const getNotes = async (req, res) => {
  const { user_id } = req.body;

  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: true });

    if (error) throw error;

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message }); 
  }
};

// Create note
const createNote = async (req, res) => {
  const { user_id, content } = req.body;
  try {
    const { error } = await supabase
      .from('notes')
      .insert([
        { user_id, content, created_at: new Date(), last_edited: new Date() },
      ]);

    if (error) throw error;

    res.status(201).json({ message: 'New note created successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Edit note
const editNote = async (req, res) => {
  const { id } = req.params;
  const { user_id, content } = req.body;

  try {
    const { error } = await supabase
      .from('notes')
      .update({ content, last_edited: new Date() })
      .eq('id', id)
      .eq('user_id', user_id);

    if (error) throw error;

    res.status(200).json({ message: 'Note updated successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Delete note
const deleteNote = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
      .eq('user_id', user_id);

    if (error) throw error;

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Summarize notes
const summarizeNotes = async (req, res) => {
  const { user_id } = req.body;

  const query = "Briefly summarize all my notes for me. Keep it short, and don't give me any recommendations. Do not ask me to follow-up with you" // TODO: Make it a custom query
  let notes = "";

  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: true });

    if (error) throw error;

    notes = data;
  } catch (e) {
    res.status(500).json({ error: e.message }); 
  }

  let notes_string = notes.map((n, i) => (i + 1) + '\) ' + n.content);
  notes_string = "The following are my notes. " + notes_string.join(". ") + ".";

  const llmRequestBody = {
    model: "Meta-Llama-3-8B-Instruct",
    prompt: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are an assistant AI.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n ${notes_string} ${query}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`,
  };

  try {
    const response = await axios.post('https://api.awanllm.com/v1/completions', llmRequestBody, {
      headers: {
        'Authorization': `Bearer ${process.env.AWAN_LLM_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    const summary = response.data.choices[0].text

    res.status(200).json({ summary });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getNotes,
  createNote,
  editNote,
  deleteNote,
  summarizeNotes,
};
