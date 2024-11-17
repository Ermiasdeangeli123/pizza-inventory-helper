// Map of item names to Unsplash image IDs
const imageMap: Record<string, string> = {
  // Base
  'Farina 00': 'photo-1603566123304-56c5a14d6d3f',
  'Farina Manitoba': 'photo-1568254183919-78a4f43a2877',
  'Farina Integrale': 'photo-1586444248902-2f64eddc13df',
  'Lievito': 'photo-1509440159596-0249088772ff',
  'Lievito Madre': 'photo-1591981131950-cda44dc5b5f4',
  'Sale': 'photo-1518110925495-7f3e066d3e14',
  'Olio Extra Vergine': 'photo-1474979266404-7eaacbcd87c5',
  'Semola': 'photo-1562411052-105105232432',

  // Dairy
  'Mozzarella': 'photo-1618164436241-4473940d1f5c',
  'Mozzarella di Bufala': 'photo-1573821663314-6dec35e8c571',
  'Grana Padano': 'photo-1486297678162-eb2a19b0a32d',
  'Parmigiano Reggiano': 'photo-1528747045269-390fe33c19f2',
  'Gorgonzola': 'photo-1452195100486-9cc805987862',
  'Ricotta': 'photo-1551489186-cf8726f514f8',
  'Scamorza Affumicata': 'photo-1634487359989-3e90c9432133',
  'Provola': 'photo-1634487134969-1c72c5b1a36c',
  'Burrata': 'photo-1573821663314-6dec35e8c571',
  'Stracciatella': 'photo-1590068897280-dead9a6df481',

  // Meats
  'Prosciutto Cotto': 'photo-1542901031-ec5eeb518506',
  'Prosciutto Crudo': 'photo-1619221882220-947b3d3c8861',
  'Speck': 'photo-1624174503860-478619028ab2',
  'Salamino Piccante': 'photo-1590507621108-433608c97823',
  'Salsiccia': 'photo-1555939594-58d7cb561ad1',
  'Pancetta': 'photo-1625938145744-e380515399b7',
  'Bresaola': 'photo-1628517481384-42daec92fb41',
  'Nduja': 'photo-1590507621108-433608c97823',
  'Porchetta': 'photo-1628517481384-42daec92fb41',
  'Wurstel': 'photo-1497946628881-a9e6160a18cf',
  'Mortadella': 'photo-1619221882220-947b3d3c8861',
  'Coppa': 'photo-1628517481384-42daec92fb41',

  // Vegetables
  'Pomodoro San Marzano': 'photo-1582284540020-8acbe03f4924',
  'Pomodorini': 'photo-1566635285905-0c069a640ace',
  'Basilico': 'photo-1600857544200-b2f666a9a2ec',
  'Rucola': 'photo-1506073881649-4e23be3e9ed0',
  'Funghi': 'photo-1504545102780-26774c8bb831',
  'Funghi Porcini': 'photo-1578868785651-9d23fd24ef28',
  'Peperoni': 'photo-1563565375-f3fdfdbefa83',
  'Melanzane': 'photo-1615484477778-ca3b77940c25',
  'Zucchine': 'photo-1583687355032-89b902b7335f',
  'Carciofi': 'photo-1551659716-6be28a8f9d19',
  'Cipolla': 'photo-1580201092675-a0a6a6cafbb1',
  'Patate': 'photo-1518977676601-b53f82aba655',
  'Mais': 'photo-1551754655-cd27e38d2076',
  'Radicchio': 'photo-1633380110125-f6e685676160',
  'Friarielli': 'photo-1576181256399-834e3b3a49bf',

  // Other
  'Olive Nere': 'photo-1632934607026-a4b782bd3f19',
  'Olive Verdi': 'photo-1595475207225-428b62bda831',
  'Capperi': 'photo-1599940778173-e276d4acb2bb',
  'Acciughe': 'photo-1626957341926-98752fc2ba90',
  'Tonno': 'photo-1597733153203-a54307e1265f',
  'Origano': 'photo-1600857544200-b2f666a9a2ec',
  'Peperoncino': 'photo-1589010588553-46e8e7c21788',
  'Aglio': 'photo-1540148426945-6cf22a6b2383',
  'Rosmarino': 'photo-1515586000433-45406d8e6662',
  'Pesto': 'photo-1599380486080-8a0a39acf066',
  'Noci': 'photo-1573851552153-816785fec5b7',
  'Pistacchio': 'photo-1606923829579-0cb981a83e2b',
  'Panna': 'photo-1563743553882-1a1f1aa00a86',
};

// Default images for each category
const categoryDefaultImages: Record<string, string> = {
  base: 'photo-1603566123304-56c5a14d6d3f', // Flour image
  dairy: 'photo-1486297678162-eb2a19b0a32d', // Cheese image
  meats: 'photo-1542901031-ec5eeb518506', // Cold cuts image
  vegetables: 'photo-1506073881649-4e23be3e9ed0', // Vegetables image
  other: 'photo-1599940778173-e276d4acb2bb', // Generic food image
};

export const getItemImage = (itemName: string, category: string): string => {
  const imageId = imageMap[itemName] || categoryDefaultImages[category] || 'photo-1599940778173-e276d4acb2bb';
  return `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=200&h=200&q=80`;
};
