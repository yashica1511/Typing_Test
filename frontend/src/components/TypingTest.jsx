import { useState, useRef, useEffect } from 'react';
import { quotesArray, random, allowedKeys } from './Helper';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { saveTypingTestResult, fetchTypingTestResults } from '../services/typingTestService';
import { useAuth } from '../context/AuthContext'; // Import the auth context

Chart.register(...registerables);

let interval = null;

const TypingTest = () => {
    const inputRef = useRef(null);
    const outputRef = useRef(null);
    const [duration, setDuration] = useState(60);
    const [started, setStarted] = useState(false);
    const [ended, setEnded] = useState(false);
    const [index, setIndex] = useState(0);
    const [correctIndex, setCorrectIndex] = useState(0);
    const [errorIndex, setErrorIndex] = useState(0);
    const [quote, setQuote] = useState({});
    const [input, setInput] = useState('');
    const [cpm, setCpm] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [isError, setIsError] = useState(false);
    const [lastScore, setLastScore] = useState(0);
    const [selectedDuration, setSelectedDuration] = useState(60);
    const { user } = useAuth(); // Get user from auth context
    const interval = useRef(null);

    useEffect(()=>{
        setLastScore(wpm);
    },[started])

    useEffect(() => {
        if (started) {
            interval.current = setInterval(() => {
                setDuration((duration) => duration - 1);
            }, 1000);
        }
        return () => clearInterval(interval.current); // Clean up interval on unmount
    }, [started]);
    

    useEffect(() => {
        if(duration == 0){
            setEnded(true);
            setStarted(false);
            clearInterval(interval.current);
        }
    },[duration])

    useEffect(() => {
        const newQuote = random(quotesArray);
        setQuote(newQuote);
        setInput(newQuote.quote);
    }, []);

    useEffect(() => {
        if (ended) {
            const saveResult = async () => {
                try {
                    await saveTypingTestResult({
                        wpm,
                        cpm,
                        accuracy,
                        errors: errorIndex,
                        duration: selectedDuration
                    });
                    console.log('Typing test result saved');
                } catch (error) {
                    console.error('Error saving typing test result:', error);
                }
            };
            saveResult();
        }
    }, [ended, wpm, cpm, accuracy, errorIndex, selectedDuration]);


    useEffect(() => {
        fetchTypingTestResults().then(results => {
            if (results.length) {
                const lastResult = results[results.length - 1];
                setLastScore(lastResult.wpm || '0');
            }
        }).catch(error => {
            console.error('Error fetching typing test results:', error);
        });
    }, []);

    const handleEnd = () => {
        setEnded(true);
        setStarted(false);
        clearInterval(interval.current);
    
        // Assuming user is available from Auth context
        const userId = user.id; // Make sure user ID exists and is passed
    
        saveTypingTestResult({
            userId,
            wpm,
            cpm,
            accuracy,
            errors: errorIndex,
            duration: selectedDuration
        }).then(() => {
            console.log('Typing test result saved');
        }).catch(error => {
            console.error('Error saving typing test result:', error);
        });
    };   


    const handleStart = () => {
        setStarted(true);
        setEnded(false);
        setInput(quote.quote);
        inputRef.current.focus();
        setTimer();
    };

    const handleKeyDown = (e) => {
    const { key } = e;
    const quoteText = quote.quote;

    if (!started || ended) return;

    // Allow space key by handling it separately
    if (key === ' ') {
        e.preventDefault(); // Prevent the space from scrolling the page
    }

    if (allowedKeys.includes(key) || key === ' ') {
        if (key === quoteText.charAt(index)) {
            setIndex(index + 1);
            setCorrectIndex(correctIndex + 1);
            setIsError(false);
            outputRef.current.innerHTML += key === ' ' ? '&nbsp;' : key; // Add space or character
        } else {
            setErrorIndex(errorIndex + 1);
            setIsError(true);
            outputRef.current.innerHTML += `<span class="text-red-500">${key === ' ' ? '&nbsp;' : key}</span>`;
        }
    }

    const totalTyped = index + 1;
    const accuracyValue = totalTyped > 0 ? Math.floor((correctIndex / totalTyped) * 100) : 0;
    const timeRemains = ((selectedDuration - duration) / 60).toFixed(2);
    const wpmValue = timeRemains > 0 ? Math.round((correctIndex / 5) / timeRemains) : 0;

    setAccuracy(accuracyValue);
    setCpm(correctIndex);
    setWpm(wpmValue);

    if (index + 1 === quoteText.length || errorIndex > 50) {
        handleEnd();
    }
};

    

    const wpmData = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Current Test'],
        datasets: [
            {
                label: 'WPM',
                data: [30, 40, 35, 50, 45, wpm], // Past WPM data plus current test WPM
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
        ],
    };

    const accuracyData = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Current Test'],
        datasets: [
            {
                label: 'Accuracy',
                data: [80, 85, 82, 90, 88, accuracy], // Past Accuracy data plus current test Accuracy
                borderColor: 'rgba(153,102,255,1)',
                backgroundColor: 'rgba(153,102,255,0.2)',
                fill: true,
            },
        ],
    };


    return (
        <div className="min-h-screen flex flex-col bg-blue-500 text-white">
            <nav className="bg-blue-700 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/home" className="text-white text-xl font-bold">Back</Link>
                </div>
            </nav>
            <div className="w-full max-w-6xl p-6 mx-auto flex flex-col">
                <div className="bg-white text-black rounded-lg shadow-lg p-6 mb-6">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4">Test Your Typing Speed</h1>

                    <div className="mb-4">
                        <select
                            className="p-2 bg-blue-600 text-white rounded"
                            value={selectedDuration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                        >
                            <option value={60}>1 Minute</option>
                            <option value={120}>2 Minutes</option>
                            <option value={300}>5 Minutes</option>
                            <option value={600}>10 Minutes</option>
                        </select>
                    </div>

                    <div className="mb-4 flex flex-wrap justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex flex-col md:flex-row w-full md:w-1/2 md:space-x-4">
                            <div className="text-center p-4 bg-blue-600 rounded-md w-full md:w-auto mb-4 md:mb-0">
                                <div className="text-3xl md:text-4xl font-semibold">{wpm}</div>
                                <div className="text-lg">WPM</div>
                            </div>
                            <div className="text-center p-4 bg-blue-600 rounded-md w-full md:w-auto mb-4 md:mb-0">
                                <div className="text-3xl md:text-4xl font-semibold">{cpm}</div>
                                <div className="text-lg">CPM</div>
                            </div>
                            <div className="text-center p-4 bg-blue-600 rounded-md w-full md:w-auto mb-4 md:mb-0">
                                <div className="text-3xl md:text-4xl font-semibold">{lastScore}</div>
                                <div className="text-lg">Last Score</div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row w-full md:w-1/2 md:space-x-4">
                            <div className="text-center p-4 bg-blue-600 rounded-md w-full md:w-auto mb-4 md:mb-0">
                                <div className="text-3xl md:text-4xl font-semibold">{accuracy}%</div>
                                <div className="text-lg">Accuracy</div>
                            </div>
                            <div className="text-center p-4 bg-blue-600 rounded-md w-full md:w-auto mb-4 md:mb-0">
                                <div className="text-3xl md:text-4xl font-semibold">{duration}</div>
                                <div className="text-lg">Timer</div>
                            </div>
                            <div className="text-center p-4 bg-blue-600 rounded-md w-full md:w-auto">
                                <div className="text-3xl md:text-4xl font-semibold">{errorIndex}</div>
                                <div className="text-lg">Errors</div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        {ended ? (
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                                onClick={() => window.location.reload()}
                            >
                                Reload
                            </button>
                        ) : started ? (
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
                                disabled
                            >
                                Hurry
                            </button>
                        ) : (
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
                                onClick={handleStart}
                            >
                                GO!
                            </button>
                        )}
                    </div>

                    {ended ? (
                        <div className="bg-white text-black p-4 rounded mb-4 border border-gray-300">
                            <span>"{quote.quote}"</span>
                            <span className="block mt-2 text-gray-600 text-sm">- {quote.author}</span>
                        </div>
                    ) : started ? (
                        <div
                            className={`text-black font-mono quotes${started ? ' active' : ''}${isError
                                ? ' is-error'
                                : ''}`}
                            tabIndex="0"
                            onKeyDown={handleKeyDown}
                            ref={inputRef}
                            style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
                        >
                            {input}
                        </div>
                    ) : (
                        <div className="font-mono quotes text-gray-400" tabIndex="-1" ref={inputRef}>
                            {input}
                        </div>
                    )}

                    <div className="p-4 mt-4 bg-white text-black rounded border border-gray-300" ref={outputRef} />

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded border border-gray-300 flex flex-col items-center">
                            <h2 className="text-xl font-bold mb-2">WPM</h2>
                            <div className="w-full h-40">
                                <Line data={wpmData} options={{ responsive: true, maintainAspectRatio: false }} />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded border border-gray-300 flex flex-col items-center">
                            <h2 className="text-xl font-bold mb-2">Accuracy</h2>
                            <div className="w-full h-40">
                                <Line data={accuracyData} options={{ responsive: true, maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TypingTest;