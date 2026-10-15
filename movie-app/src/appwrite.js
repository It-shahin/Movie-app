import { Client, TablesDB, Query, ID } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
.setProject(PROJECT_ID);

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try {
        const result = await tablesDB.listRows({ databaseId: DATABASE_ID, tableId: TABLE_ID,
             queries: [Query.equal('searchTerm', searchTerm)] });

        if (result.rows.length > 0) {
            const doc = result.rows[0];

            await tablesDB.updateRow({ databaseId: DATABASE_ID, tableId: TABLE_ID, rowId: doc.$id,
                data: { count: doc.count + 1 }
            });
        
        } else {
            await tablesDB.createRow({ databaseId: DATABASE_ID, tableId: TABLE_ID, rowId: ID.unique(), data: {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: movie.poster_path ? 
                `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
            } });
        }

    } catch (error) {
        console.log('Error updating search count:', error);
    }
}

export const getsearchCount = async () => {
    try {
        const result = await tablesDB.listRows({ databaseId: DATABASE_ID, tableId: TABLE_ID,
            queries: [Query.limit(5), Query.orderDesc('count')]
        });
        return result.rows;

    } catch (error) {
        console.log('Error fetching search count:', error);
        return 0;
    }
}

export const getTrendingMovies = async () => {
  try {
    const result = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.orderDesc('count'), Query.limit(10)]
    });
    return result.rows;
  } catch (error) {
    console.error('Error fetching trending:', error);
    return [];
  }
}; 