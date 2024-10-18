"use client"


export default function Pay({setCurrency}) {
    
    return (
        <div className="dropdown">
            <span className="text-sm text-red-600 font-semibold p-2">Select currency</span>
            <div className="dropdown-content">
                <div 
                    className="cursor-pointer my-2" 
                    onClick={() => setCurrency("USD")}
                >
                    USD
                </div>
                <div 
                    className="cursor-pointer my-2" 
                    onClick={() => setCurrency("EUR")}
                >
                    EUR
                </div>
            </div>
        </div>
    );
}
