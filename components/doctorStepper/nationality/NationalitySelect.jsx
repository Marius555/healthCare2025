import React, { useState, useRef, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// List of nationalities
const nationalities = [
  "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Antiguan and Barbudan", "Argentine",
  "Armenian", "Australian", "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian",
  "Belarusian", "Belgian", "Belizean", "Beninese", "Bhutanese", "Bolivian", "Bosnian and Herzegovinian",
  "Botswanan", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabé", "Burmese", "Burundian",
  "Cabo Verdean", "Cambodian", "Cameroonian", "Canadian", "Central African", "Chadian", "Chilean", "Chinese",
  "Colombian", "Comorian", "Congolese (Congo-Brazzaville)", "Congolese (Congo-Kinshasa)", "Costa Rican",
  "Croatian", "Cuban", "Cypriot", "Czech", "Danish", "Djiboutian", "Dominican", "Dutch", "Ecuadorian",
  "Egyptian", "Emirati", "Equatorial Guinean", "Eritrean", "Estonian", "Eswatini", "Ethiopian", "Fijian",
  "Filipino", "Finnish", "French", "Gabonese", "Gambian", "Georgian", "German", "Ghanaian", "Greek", "Grenadian",
  "Guatemalan", "Guinean", "Guyanese", "Haitian", "Honduran", "Hungarian", "Icelandic", "Indian", "Indonesian",
  "Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakh",
  "Kenyan", "Kiribati", "Kuwaiti", "Kyrgyz", "Lao", "Latvian", "Lebanese", "Lesotho", "Liberian", "Libyan",
  "Liechtensteiner", "Lithuanian", "Luxembourgish", "Malagasy", "Malawian", "Malaysian", "Maldivian", "Malian",
  "Maltese", "Marshallese", "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monacan",
  "Mongolian", "Montenegrin", "Moroccan", "Mozambican", "Namibian", "Nauruan", "Nepalese", "New Zealander",
  "Nicaraguan", "Nigerian", "North Korean", "North Macedonian", "Norwegian", "Omani", "Pakistani", "Palauan",
  "Palestinian", "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", "Polish", "Portuguese", "Qatari",
  "Romanian", "Russian", "Rwandan", "Saint Kitts and Nevisian", "Saint Lucian", "Saint Vincentian", "Samoan",
  "San Marinese", "Sao Tomean", "Saudi", "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean",
  "Slovak", "Slovenian", "Solomon Islander", "Somali", "South African", "South Korean", "South Sudanese",
  "Spanish", "Sri Lankan", "Sudanese", "Surinamese", "Swazi", "Swedish", "Swiss", "Syrian", "Tajik", "Tanzanian",
  "Thai", "Timorese", "Togolese", "Tongan", "Trinidadian and Tobagonian", "Tunisian", "Turkish", "Turkmen",
  "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan", "Uzbek", "Vanuatuan", "Vatican", "Venezuelan", "Vietnamese",
  "Yemeni", "Zambian", "Zimbabwean"
];

// Create a mapping dictionary for case-insensitive lookups
const nationalityMap = nationalities.reduce((acc, nationality) => {
  acc[nationality.toLowerCase()] = nationality;
  return acc;
}, {});

export default function NationalitySelect({ value, onChange, ...props }) {
  const [visibleCount, setVisibleCount] = useState(25);
  const [isOpen, setIsOpen] = useState(false);
  const loadingRef = useRef(null);
  
  // Normalize the incoming value to ensure consistency
  const normalizedValue = value ? value.toLowerCase() : '';
  
  // Reset visible count when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setVisibleCount(25);
    }
  }, [isOpen]);
  
  // Set up Intersection Observer to detect when user scrolls to loading indicator
  useEffect(() => {
    if (!isOpen || !loadingRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleCount < nationalities.length) {
        // Load more nationalities when loading indicator is visible
        setVisibleCount(prev => Math.min(prev + 25, nationalities.length));
      }
    }, { threshold: 0.1 });
    
    observer.observe(loadingRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [isOpen, visibleCount]);

  // When value changes, ensure the nationality is in the visible list
  useEffect(() => {
    if (normalizedValue && isOpen) {
      // Find the index of the selected nationality
      const index = nationalities.findIndex(
        nationality => nationality.toLowerCase() === normalizedValue
      );
      
      if (index >= 0 && index >= visibleCount) {
        // If the selected nationality is beyond currently visible items,
        // increase visible count to include it
        setVisibleCount(Math.min(index + 5, nationalities.length));
      }
    }
  }, [normalizedValue, isOpen, visibleCount]);

  // Wrap the onChange handler to normalize values
  const handleValueChange = (newValue) => {
    if (onChange) {
      // Make sure we consistently pass the lowercase value
      onChange(newValue.toLowerCase());
    }
  };

  return (
    <Select
      value={normalizedValue}
      onValueChange={handleValueChange}
      {...props}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (props.onOpenChange) props.onOpenChange(open);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select nationality">
          {normalizedValue ? nationalityMap[normalizedValue] : ''}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="h-80 overflow-y-auto">
        {nationalities.slice(0, visibleCount).map((nationality, index) => (
          <SelectItem key={index} value={nationality.toLowerCase()}>
            {nationality}
          </SelectItem>
        ))}
        
        {visibleCount < nationalities.length && (
          <div 
            ref={loadingRef}
            className="py-2 text-center text-xs text-gray-400"
          >
            Loading more nationalities...
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
