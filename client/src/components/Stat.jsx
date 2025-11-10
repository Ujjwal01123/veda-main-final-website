'use client'
import React, { useEffect, useRef } from 'react';

const Stat = () => {
    const stats = [
        { label: 'Courses', value: 100, suffix: '+' },
        { label: 'Astrologers', value: 150, suffix: '+' },
        { label: 'Puja Performed', value: 120, suffix: '+' },
        { label: 'Satisfied Cuustomers', value: 250, suffix: '+' }
    ];

    const animateCountUp = (element, targetValue, duration = 2000) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;
            const currentCount = Math.min(Math.floor((progress / duration) * targetValue), targetValue);
            element.textContent = currentCount.toLocaleString();
            if (progress < duration) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = targetValue.toLocaleString() + (stats.find(stat => stat.value === targetValue)?.suffix || '');
            }
        };
        window.requestAnimationFrame(step);
    };

    const statRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const targetValue = parseInt(entry.target.dataset.value);
                        animateCountUp(entry.target, targetValue);
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        statRefs.current.forEach(ref => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            statRefs.current.forEach(ref => {
                if (ref) {
                    observer.unobserve(ref);
                }
            });
        };
    }, []);

    return (
        <div className="dark:bg-gray-900">
            <div className="pt-12 bg-gradient-to-t from-yellow-400 via-orange-200 to-transparent dark:bg-gray-900 sm:pt-20">
                <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold leading-9 text-red-900 dark:text-white sm:text-4xl sm:leading-10">
                            Our Achievements
                        </h2>
                        <p className="mt-3 text-xl leading-7 text-red-800 dark:text-gray-400 sm:mt-4">
                            Here are some of our key statistics that highlight our dedication and success.
                        </p>
                    </div>
                </div>
                <div className="pb-12 mt-10 bg-red-900 dark:bg-gray-900 sm:pb-16">
                    <div className="relative">
                        <div className="absolute inset-0 h-1/2 bg-yellow-400 dark:bg-gray-900"></div>
                        <div className="relative max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto">
                                <dl className="bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:grid sm:grid-cols-4">
                                    {stats.map((stat, index) => (
                                        <div
                                            key={index}
                                            className={`flex flex-col p-6 text-center ${index === 0 ? 'sm:border-r' : ''} ${index === 1 ? 'border-t sm:border-t-0 sm:border-l sm:border-r' : ''} ${index === 2 ? 'border-t sm:border-t-0 sm:border-l' : ''} border-gray-100 dark:border-gray-700`}
                                        >
                                            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-yellow-400 dark:text-gray-400">
                                                {stat.label}
                                            </dt>
                                            <dd
                                                ref={el => statRefs.current[index] = el}
                                                data-value={stat.value}
                                                className="order-1 text-5xl font-extrabold leading-none text-yellow-600 dark:text-indigo-100"
                                            >
                                                0
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stat;