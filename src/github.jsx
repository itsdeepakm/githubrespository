import { useState } from 'react';

export default function Github() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');

  async function fetchData() {
    if (!search) return; 
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${search}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const result = await response.json();
      setData(result.items);
      console.log(result.items);
    } catch (error) {
      console.error(error);
      setData(null);
    }
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <>
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Enter GitHub username"
        value={search}
      />
      <button onClick={fetchData}>Search</button>

      {data && (
        data.map((user)=>{
            return (
                <div key={user.id}>
                    <img src={user.avatar_url} alt={user.login} width="50" />
                    <a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.login}</a>
                </div>
            )
        })
      )}
    </>
  );
}
