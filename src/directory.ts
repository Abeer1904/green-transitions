import type { TrackId } from './model';
/** Editorial summaries of the user-supplied Green Skill directory.pdf, 13 pages.
 * Named organisations are source leads, not independently verified live offers. */
export const DIRECTORY: Record<TrackId, { pages: string; options: string[]; setup: string[]; models: string[]; training: { role: string; lead: string; page: string }[]; cases: string[] }> = {
  biogas: {
    pages: '1–6',
    options: ['Fixed-dome, floating-drum and portable/prefabricated plants.', 'Household cooking, community piped gas, electricity generation and compressed biogas are different applications.', 'Slurry processing connects the energy system to farming; briquettes are a separate biomass enterprise option.'],
    setup: ['Survey dung and other feedstock, including seasonal availability.', 'Identify the appropriate household or collective model and check applicable support.', 'Arrange qualified construction and prepare the operator and collection team.', 'Agree gas distribution, user payments where relevant, maintenance and slurry use.'],
    models: ['Household ownership for cooking and manure use.', 'SHG, dairy cooperative or farmer organisation managing a collective service.', 'Feedstock collection, slurry processing and technical maintenance as linked livelihoods.'],
    training: [
      { role: 'Biogas plant mason', lead: 'KVK network; IIT Delhi Biogas Development and Training Centre', page: '2' },
      { role: 'Biogas plant operator', lead: 'IIT Delhi training centre; Hydrocarbon Sector Skill Council for relevant CBG roles', page: '3' },
      { role: 'Feedstock service provider', lead: 'Skill Council for Green Jobs — agri-residue aggregation lead', page: '3' },
      { role: 'Slurry processor and packager', lead: 'CCS Haryana Agricultural University / Agri-business Incubation Centre; KVK network', page: '3' },
      { role: 'Safety and compliance recorder', lead: 'Biogas Development and Training Centre and relevant qualification registers; council naming in the directory needs reconciliation', page: '3–4' },
      { role: 'Briquette or pellet maker', lead: 'Institute of Industrial Development — biomass briquettes course lead', page: '4' },
    ],
    cases: ['Naya Gaon and Dhani Mahu: examine collective ownership, feedstock and operating arrangements.', 'Panipat residue use and Kaithal CBG: examine collection markets and scale. These are distinct technologies, not interchangeable plant models.'],
  },
  solar: {
    pages: '6–11',
    options: ['Household rooftops, ground-mounted systems and irrigation pumps serve different needs.', 'Grid-tied, off-grid and hybrid configurations differ in storage and outage behaviour.', 'A household system, shared pump and institutional service contract need different ownership arrangements.'],
    setup: ['Map household, agricultural or public-service loads.', 'Assess the roof or land and who controls access to it.', 'For pumps, assess water conditions and applicable restrictions before sizing.', 'Check schemes and application routes, arrange qualified installation and prepare a local maintenance pool.'],
    models: ['Household-owned rooftop systems.', 'Farmer-owned or cooperative irrigation pumps.', 'Institutional RESCO/service-payment arrangements.', 'Cooperative export arrangements where a suitable agreement exists.', 'Local installation, cleaning and maintenance services.'],
    training: [
      { role: 'Solar technician', lead: 'Suryamitra; Solis Energy Solutions, Faridabad; Surya Urza Enterprise, Hisar', page: '8' },
      { role: 'Solar pump installer', lead: 'NISE, Gurugram — Varunmitra programme lead', page: '8–9' },
      { role: 'Solar maintenance service provider', lead: 'NISE / Suryamitra short-course leads; confirm which tasks and qualifications are covered', page: '9' },
      { role: 'Community energy coordinator', lead: 'Varunmitra and National Power Training Institute, Faridabad — investigate operator training relevant to the role', page: '9' },
      { role: 'Energy auditor', lead: 'Bureau of Energy Efficiency — verify the relevant qualification and certification route', page: '9' },
    ],
    cases: ['Dharnai: the directory raises questions about affordability, competing grid supply and maintenance.', 'Dhundi: examine the cooperative and power-purchase arrangement rather than assuming the same terms apply locally.'],
  },
};
