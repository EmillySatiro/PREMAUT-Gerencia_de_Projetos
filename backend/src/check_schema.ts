import { supabase } from "./services/supabaseClient";

async function check() {
    const { data, error } = await supabase.from('arquivos').select('*').limit(1);
    if (error) console.error(error);
    else console.log('Arquivos keys:', data && data[0] ? Object.keys(data[0]) : 'No data');

    const { data: ev, error: evErr } = await supabase.from('eventos').select('*').limit(1);
    if (evErr) console.error(evErr);
    else console.log('Eventos keys:', ev && ev[0] ? Object.keys(ev[0]) : 'No data');
}

check();
