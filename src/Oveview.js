import React from 'react';
import { FiStar, FiPhone } from 'react-icons/fi';

function Overview( {driverData} ) {    
    return (
        <div className="text-center">
            {/* Profile Card */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Profile</h3>
                <p className="text-gray-600">
                    <FiStar className="inline-block mr-1" /> {driverData.rating}
                </p>
                <p className="text-gray-600">
                    <FiPhone className="inline-block mr-1" /> {driverData.trips}
                </p>
                <p className="text-gray-600">
                    <FiPhone className="inline-block mr-1" /> {driverData.yearsInService}
                </p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Car</h3>
                <p className="text-gray-600">{driverData.car}</p>
                <img
                    src="https://media.assets.ansira.net/websites/content/cblt-ms-gmps-en-us/generic/c46a4837770c467489587aef8a678331_c132x0-1221x686_x1221.png"
                    alt="Car"
                    className="w-24 h-24 mx-auto mb-2"
                />
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Services</h3>
                <div className="grid grid-cols-1 gap-1 mt-2">
                    {driverData.services.map((service, index) => (
                        <div key={index} className="bg-ghost p-3 rounded-md shadow-md">
                            {service}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default Overview;
