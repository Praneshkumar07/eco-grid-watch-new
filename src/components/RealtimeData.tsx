import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { ref, onValue } from 'firebase/database';

const RealtimeData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const dataRef = ref(db, 'messages');
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  }, []);

  return (
    <div>
      <h2>Realtime Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default RealtimeData;