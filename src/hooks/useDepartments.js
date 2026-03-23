import { useEffect, useState } from "react";

const useDepartments = () => {
    const [data, setData] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await fetch("/api/departments");
                const result = await res.json();

                setData({
                    title: result.title,
                    subtitle: result.subtitle,
                });

                setDepartments(result.departments || []);
            } catch (err) {
                console.error("Departments API Error:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    return { data, departments, loading, error };
};

export default useDepartments;