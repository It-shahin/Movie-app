import { Client, Databases, Query, ID } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(PROJECT_ID);

const databases = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try {
        const result = await databases.listDocuments(DATABASE_ID, TABLE_ID,
             [Query.equal('searchTerm', searchTerm)]);

        if (result.documents.length > 0) {
            const doc = result.documents[0];

            await databases.updateDocument(DATABASE_ID, TABLE_ID, doc.$id, {
                count: doc.count + 1,
            });
        
        } else {
            await databases.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: movie.poster_path ? 
                `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
            });
        }

    } catch (error) {
        console.log('Error updating search count:', error);
    }
}

export const getsearchCount = async () => {
    try {
        const result = await databases.listDocuments(DATABASE_ID, TABLE_ID, 
            [Query.limit(5), 
            Query.orderDesc('count')
        ]);
        return result.documents;

    } catch (error) {
        console.log('Error fetching search count:', error);
        return 0;
    }
}

export const getTrendingMovies = async () => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID, 
      TABLE_ID, 
      [Query.orderDesc('count'), Query.limit(10)]
    );
    return result.documents;
  } catch (error) {
    console.error('Error fetching trending:', error);
    return [];
  }
}; 