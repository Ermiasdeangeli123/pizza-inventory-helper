// Map of item names to Unsplash image IDs
const imageMap: Record<string, string> = {
  // Base
  'Farina 00': 'photo-1603566123304-56c5a14d6d3f',
  'Farina Manitoba': 'photo-1603566123304-56c5a14d6d3f',
  'Farina Integrale': 'photo-1603566123304-56c5a14d6d3f',
  'Lievito': 'photo-1509440159596-0249088772ff',
  'Lievito Madre': 'photo-1509440159596-0249088772ff',
  'Sale': 'photo-1518110925495-7f3e066d3e14',
  'Olio Extra Vergine': 'photo-1474979266404-7eaacbcd87c5',
  'Semola': 'photo-1603566123304-56c5a14d6d3f',

  // Dairy
  'Mozzarella': 'photo-1618164436241-4473940d1f5c',
  'Mozzarella di Bufala': 'photo-1618164436241-4473940d1f5c',
  'Grana Padano': 'photo-1486297678162-eb2a19b0a32d',
  'Parmigiano Reggiano': 'photo-1486297678162-eb2a19b0a32d',
  'Gorgonzola': 'photo-1452195100486-9cc805987862',
  'Ricotta': 'photo-1551489186-cf8726f514f8',
  'Scamorza Affumicata': 'photo-1486297678162-eb2a19b0a32d',
  'Provola': 'photo-1486297678162-eb2a19b0a32d',
  'Burrata': 'photo-1573821663314-6dec35e8c571',
  'Stracciatella': 'photo-1573821663314-6dec35e8c571',

  // Meats
  'Prosciutto Cotto': 'photo-1542901031-ec5eeb518506',
  'Prosciutto Crudo': 'photo-1542901031-ec5eeb518506',
  'Speck': 'photo-1542901031-ec5eeb518506',
  'Salamino Piccante': 'photo-1542901031-ec5eeb518506',
  'Salsiccia': 'photo-1555939594-58d7cb561ad1',
  'Pancetta': 'photo-1542901031-ec5eeb518506',
  'Bresaola': 'photo-1542901031-ec5eeb518506',
  'Nduja': 'photo-1542901031-ec5eeb518506',
  'Porchetta': 'photo-1542901031-ec5eeb518506',
  'Wurstel': 'photo-1555939594-58d7cb561ad1',
  'Mortadella': 'photo-1542901031-ec5eeb518506',
  'Coppa': 'photo-1542901031-ec5eeb518506',

  // Vegetables
  'Pomodoro San Marzano': 'photo-1582284540020-8acbe03f4924',
  'Pomodorini': 'photo-1582284540020-8acbe03f4924',
  'Basilico': 'photo-1600857544200-b2f666a9a2ec',
  'Rucola': 'photo-1506073881649-4e23be3e9ed0',
  'Funghi': 'photo-1504545102780-26774c8bb831',
  'Funghi Porcini': 'photo-1504545102780-26774c8bb831',
  'Peperoni': 'photo-1563565375-f3fdfdbefa83',
  'Melanzane': 'photo-1615484477778-ca3b77940c25',
  'Zucchine': 'photo-1583687355032-89b902b7335f',
  'Carciofi': 'photo-1551659716-6be28a8f9d19',
  'Cipolla': 'photo-1580201092675-a0a6a6cafbb1',
  'Patate': 'photo-1518977676601-b53f82aba655',
  'Mais': 'photo-1551754655-cd27e38d2076',
  'Radicchio': 'photo-1506073881649-4e23be3e9ed0',
  'Friarielli': 'photo-1506073881649-4e23be3e9ed0',

  // Other
  'Olive Nere': 'photo-1632934607026-a4b782bd3f19',
  'Olive Verdi': 'photo-1632934607026-a4b782bd3f19',
  'Capperi': 'photo-1599940778173-e276d4acb2bb',
  'Acciughe': 'photo-1599940778173-e276d4acb2bb',
  'Tonno': 'photo-1599940778173-e276d4acb2bb',
  'Origano': 'photo-1600857544200-b2f666a9a2ec',
  'Peperoncino': 'photo-1563565375-f3fdfdbefa83',
  'Aglio': 'photo-1540148426945-6cf22a6b2383',
  'Rosmarino': 'photo-1600857544200-b2f666a9a2ec',
  'Pesto': 'photo-1600857544200-b2f666a9a2ec',
  'Noci': 'photo-1573851552153-816785fec5b7',
  'Pistacchio': 'photo-1573851552153-816785fec5b7',
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