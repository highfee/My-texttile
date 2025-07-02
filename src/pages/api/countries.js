export async function GetCountries() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2,postalCode,idd"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch country data");
    }
    const data = await response.json();
    const countries = data.map((country) => ({
      name: country.name.common,
      code: country.cca2,
      postalCode:
        country.postalCode && country.postalCode.format
          ? country.postalCode.format
          : null,
      countryCode:
        country.idd &&
        country.idd.root &&
        country.idd.suffixes &&
        country.idd.suffixes.length > 0
          ? `${country.idd.root}${country.idd.suffixes[0]}`
          : null,
    }));
    return countries.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error fetching country data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
