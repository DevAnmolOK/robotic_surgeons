export async function searchDoctors({
  searchTerm,
  location,
  procedure,
}: {
  searchTerm?: string;
  location?: string;
  procedure?: string;
}) {
  const params = new URLSearchParams();
  if (searchTerm) params.append("search", searchTerm);
  if (location) params.append("location", location);
  if (procedure && procedure !== "All Procedures") {
    params.append("specialty", procedure);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/doctors?${params.toString()}`
  );

  if (!res.ok) {
    let message = "Failed to fetch doctors";
    try {
      const err = await res.json();
      if (err?.message) message = err.message;
    } catch (_) {}
    // throw new Error(message);
    return {
      message: "No Doctors found",
    };
  }

  const json = await res.json();
  return json.data || [];
}

