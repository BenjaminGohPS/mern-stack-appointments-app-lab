const useFetch = () => {
  try {
    const fetchData = async (endpoint, method, body) => {
      const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        if (Array.isArray(data.msg)) {
          const returnValue = data.msg.map((item, idx) => (
            <p key={idx}>{item.msg}</p>
          ));

          return { ok: false, msg: returnValue };
        } else {
          return { ok: false, msg: data.msg };
        }
      } else {
        return { ok: true, data };
      }
    };

    return fetchData;
  } catch (error) {
    console.error(error.message);
    return { ok: false, msg: "data error" };
  }
};

export default useFetch;
