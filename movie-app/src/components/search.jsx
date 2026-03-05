import React from 'react'



const search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className='search'>
        <div>
            <img src="./src/assets/search.svg" alt="Search" />

            <input
                type="text"
                placeholder='Search for movies...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            
        </div>
    </div>
  )
}

export default search
