import { Song } from "@/types";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({  
      
        cookies: cookies
    });
    const {data: {
        session
    }} = await supabase.auth.getSession();
    const { data } = await supabase 
    .from('liked_songs')
    .select('*, song(*)')
    .eq('user_id', session?.user?.id)
    .order('created_at', { ascending: false })

  if (!data) return [];
  return data.map((item: { songs: any; }) => ({
    ...item.songs
  }))
};

export default getLikedSongs;