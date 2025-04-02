import React, { useState, useRef, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// List of all countries
const countries = [
  "Afghanistan", "Albania", "Algeria", "United States", "Andorra", "Angola",
  "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
  "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
  "Botswana", "Brazil", "United Kingdom", "Brunei", "Bulgaria", "Burkina Faso",
  "Myanmar", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
  "Republic of the Congo", "Democratic Republic of the Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
  "Dominican Republic", "Netherlands", "Ecuador", "Egypt", "United Arab Emirates",
  "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji",
  "Philippines", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
  "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti",
  "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
  "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
  "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
  "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
  "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
  "Namibia", "Nauru", "Nepal", "New Zealand", "Nicaragua", "Nigeria",
  "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
  "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Poland",
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "São Tomé and Príncipe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
  "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
  "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
  "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "Uruguay",
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
  "Zambia", "Zimbabwe"
];

// Create a mapping dictionary for case-insensitive lookups
const countryMap = countries.reduce((acc, country) => {
  acc[country.toLowerCase()] = country;
  return acc;
}, {});

export default function CountrySelect({value, onChange, ...props}) {
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
      if (entries[0].isIntersecting && visibleCount < countries.length) {
        // Load more countries when loading indicator is visible
        setVisibleCount(prev => Math.min(prev + 25, countries.length));
      }
    }, { threshold: 0.1 });
    
    observer.observe(loadingRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [isOpen, visibleCount]);

  // When value changes, ensure the country is in the visible list
  useEffect(() => {
    if (normalizedValue && isOpen) {
      // Find the index of the selected country
      const index = countries.findIndex(
        country => country.toLowerCase() === normalizedValue
      );
      
      if (index >= 0 && index >= visibleCount) {
        // If the selected country is beyond currently visible items, 
        // increase visible count to include it
        setVisibleCount(Math.min(index + 5, countries.length));
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
        <SelectValue placeholder="Select country that you are working in">
          {normalizedValue ? countryMap[normalizedValue] : ''}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="h-80 overflow-y-auto">
        {countries.slice(0, visibleCount).map((country, index) => (
          <SelectItem 
            key={index} 
            value={country.toLowerCase()}
          >
            {country}
          </SelectItem>
        ))}
        
        {visibleCount < countries.length && (
          <div 
            ref={loadingRef}
            className="py-2 text-center text-xs text-gray-400"
          >
            Loading more countries...
          </div>
        )}
      </SelectContent>
    </Select>
  );
}