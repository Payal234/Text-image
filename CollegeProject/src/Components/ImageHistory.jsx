import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";

const History = () => {
  const { user, backendUrl, token } = useContext(AppContext);
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (user?._id) {
        try {
          const { data } = await axios.get(
            `${backendUrl}/api/image-history/user/${user._id}`,
            {
              headers: {
                token,
              },
            }
          );

          if (data.success) {
            setHistories(data.histories);
          } else {
            toast.error(`Error: ${data.message}`);
          }
        } catch (error) {
          console.error("Fetch history error:", error.message);
          toast.error("Server Error: " + error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user,backendUrl,token]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Image Generation History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : histories.length === 0 ? (
        <p>No image history found.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
          {histories.map((history) => (
            <div key={history._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
              <p><strong>Prompt:</strong> {history.prompt}</p>
              <img src={history.imageUrl} alt={history.prompt} style={{ width: "100%", height: "auto" }} />
              <p><small>Generated on: {new Date(history.createdAt).toLocaleString()}</small></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
