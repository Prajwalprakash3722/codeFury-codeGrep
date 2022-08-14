import React from 'react'

function contact() {
  return (
    <><a
      className="block overflow-hidden border border-gray-100 rounded-lg shadow-sm"
      href="https://www.spacex.com/"
    >
      <img
        className="object-cover w-full h-56"
        src="https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt=""
      />

      <div className="p-6">
        <h5 className="text-xl font-bold">
          SpaceX
        </h5>

        <p className="mt-2 text-sm text-gray-500">
          Space Exploration Technologies Corp. is an American spacecraft manufacturer, space launch provider, and a satellite communications corporation headquartered in Hawthorne, California.
        </p>

        <div
          className="inline-block pb-1 mt-4 font-medium text-blue-600 border-b border-blue-500 "
        >
          Find out more
          <span aria-hidden="true">&rarr;</span>
        </div>
      </div>
    </a>
      <a
        className="block overflow-hidden border border-gray-100 rounded-lg shadow-sm"
        href="https://www.olacabs.com/"
      >
        <img
          className="object-cover w-full h-56"
          src="https://images.unsplash.com/photo-1490650404312-a2175773bbf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGF4aXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        />

        <div className="p-6">
          <h5 className="text-xl font-bold">
            OLA Cabs
          </h5>

          <p className="mt-2 text-sm text-gray-500">
            Ola Cabs is an Indian multinational ridesharing company, headquartered in Bangalore. It also operates in other business verticals including financial services and cloud kitchens.
          </p>

          <div
            className="inline-block pb-1 mt-4 font-medium text-blue-600 border-b border-blue-500 "
          >
            Find out more
            <span aria-hidden="true">&rarr;</span>
          </div>
        </div>
      </a>

    </>
  )
}

export default contact