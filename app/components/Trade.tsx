import React from 'react'

const Trade = () => {
    return (
        <>
            <div className="w-full px-4 mb-4">
                <div className="bg-white shadow rounded-lg h-full">
                    <div className="p-4">
                        <h1 className="flex items-center mb-3 font-bold">
                            Trade  Rankings
                        </h1>
                        <small>Bronze</small>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs w-[200px] justify-center text-center h-[30px] content-center cursor-pointer font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bronze">
                                        £ 999
                                    </span>

                                </div>
                            </div>
                            <hr />
                        </div>
                        <small>Silver</small>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs w-[200px] justify-center text-center h-[30px] content-center cursor-pointer font-semibold inline-block py-1 px-2 uppercase rounded-full text-white silver">
                                        £ 2999
                                    </span>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <small>Gold</small>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs w-[200px] justify-center text-center h-[30px] content-center cursor-pointer font-semibold inline-block py-1 px-2 uppercase rounded-full text-white gold">
                                        £ 4999
                                    </span>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <small>Platinum</small>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs w-[200px] justify-center text-center h-[30px] content-center cursor-pointer font-semibold inline-block py-1 px-2 uppercase rounded-full text-white platinum">
                                        £ 9999
                                    </span>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Trade