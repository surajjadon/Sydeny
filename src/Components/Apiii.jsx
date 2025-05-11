export async function fetchEvents({ category = 'all', searchTerm = '', page = 0, loadAll = false }) {
  const size = 100;
  let currentPage = page;
  let allEvents = [];

  const params = new URLSearchParams({
    apikey: "jdCpz1WN0JvFtKEyAIe290mrYOGejNA9",
    city: 'Sydney',
    size: size.toString(),
    page: currentPage.toString()
  });

  if (category !== 'all') params.append('segmentId', category);
  if (searchTerm.trim() !== '') params.append('keyword', searchTerm.trim());

  const url = `https://app.ticketmaster.com/discovery/v2/events.json?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error ${response.status}`);
  const data = await response.json();

  const firstPageEvents = data._embedded?.events || [];
  const totalPages = data.page?.totalPages || 1;
  const totalElements = data.page?.totalElements || firstPageEvents.length;

  allEvents = [...firstPageEvents];

  // If asked to load all, fetch the rest
  if (loadAll && totalPages > 1) {
    for (let i = 1; i < totalPages; i++) {
      const extraParams = new URLSearchParams(params);
      extraParams.set("page", i.toString());

      const extraUrl = `https://app.ticketmaster.com/discovery/v2/events.json?${extraParams.toString()}`;
      const extraRes = await fetch(extraUrl);
      const extraData = await extraRes.json();
      allEvents = allEvents.concat(extraData._embedded?.events || []);
    }
  }

  return {
    events: allEvents,
    totalPages,
    totalElements
  };
}
