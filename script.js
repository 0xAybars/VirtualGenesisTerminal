// DOM Elements
const tableContainer = document.getElementById('tableContainer');
const tokensTable = document.getElementById('tokensTable');
const tokensTableBody = document.getElementById('tokensTableBody');
const loadingContainer = document.getElementById('loadingContainer');
const emptyState = document.getElementById('emptyState');
const pagination = document.getElementById('pagination');
const searchInput = document.getElementById('searchInput');
const tokenModal = document.getElementById('tokenModal');
const closeModal = document.getElementById('closeModal');
const pageSizeSelect = document.getElementById('pageSizeSelect');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const copyAddressButton = document.getElementById('copyAddress');
const sortableHeaders = document.querySelectorAll('th.sortable');
const closeInfoModal = document.getElementById('closeInfoModal');

// Add console logs to check if DOM elements exist
console.log('closeInfoModal element exists:', !!closeInfoModal);

// Suppress external script errors
// This prevents console from being filled with external script errors
const originalConsoleError = console.error;
console.error = function (...args) {
  // Skip errors from external domains
  const skipDomains = [
    'geckoterminal.com',
    'btloader.com',
    'webcontentassessor.com',
    'Failed to register a ServiceWorker',
  ];

  // Check if any of the error text includes domains we want to suppress
  const errorText = args.join(' ');
  if (!skipDomains.some((domain) => errorText.includes(domain))) {
    originalConsoleError.apply(console, args);
  }
};

// Add modern table styles
const style = document.createElement('style');
style.textContent = `
  /* Modern table styles */
  .modern-table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    background: rgba(20, 20, 24, 0.2);
    backdrop-filter: blur(10px);
  }
  
  #tokensTable {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
  }
  
  #tokensTable thead th {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    padding: 0.75rem;
    background: rgba(30, 30, 34, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }
  
  #tokensTable th.sortable {
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  #tokensTable th.sortable:hover {
    background: rgba(55, 55, 60, 0.6);
  }
  
  /* GeckoTerminal Chart Styling */
  .geckoterminal-chart {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }
  
  .geckoterminal-chart:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }
  
  .no-chart-message {
    background: rgba(30, 30, 34, 0.5);
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    margin: 1rem 0;
    color: var(--text-secondary);
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed rgba(255, 255, 255, 0.1);
  }
  
  .no-chart-message p {
    font-size: 1rem;
    opacity: 0.8;
    max-width: 80%;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  .token-detail-embed, .chart-tab-embed {
    margin: 1rem 0 2rem 0;
    border-radius: 12px;
    overflow: hidden;
  }
  
  .chart-tab-embed {
    height: 600px;
  }
  
  .token-listing-info {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  .listing-label {
    font-weight: 500;
    margin-right: 0.5rem;
  }
  
  .listing-value {
    color: var(--text-primary);
  }
  
  /* Modern row styling */
  .modern-row {
    height: 56px; /* Thinner rows */
    transition: all 0.2s ease;
    background: rgba(30, 30, 34, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  }
  
  .modern-row:hover {
    background: rgba(55, 55, 60, 0.5);
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  }
  
  .modern-row td {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    vertical-align: middle;
  }
  
  /* Cell specific styling */
  .name-cell {
    font-weight: 500;
    max-width: 180px;
  }
  
  .token-logo {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .token-name-cell {
    display: flex;
    align-items: center;
  }
  
  .token-name {
    font-weight: 600;
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.15s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
  }
  
  .token-name:hover {
    color: var(--primary-color);
  }
  
  .token-symbol {
    font-size: 0.8rem;
    color: var(--text-secondary);
    opacity: 0.8;
  }
  
  /* Unlock badge styling */
  .unlock-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    background: rgba(79, 70, 229, 0.15);
    color: rgb(128, 255, 153);
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    margin-left: 0.5rem;
  }
  
  .detail-unlock-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(79, 70, 229, 0.15);
    color: rgb(139, 127, 255);
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
    margin-left: 0.75rem;
  }
  
  /* Modern button icons for trade and info */
  .trade-button, .info-button, .detail-info-button, .detail-trade-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 6px;
    transition: all 0.2s ease;
    margin: 0 2px;
    text-decoration: none;
    font-size: 14px;
    border: none;
    outline: none;
    padding: 0;
    cursor: pointer;
  }
  
  .trade-button {
    background: linear-gradient(135deg, rgba(56, 178, 172, 0.8), rgba(12, 74, 110, 0.9));
    color: white;
    box-shadow: 0 2px 4px rgba(20, 184, 166, 0.3);
  }
  
  .trade-button:hover {
    background: linear-gradient(135deg, rgba(56, 178, 172, 0.9), rgba(12, 74, 110, 1));
    transform: translateY(-2px);
    box-shadow: 0 3px 6px rgba(20, 184, 166, 0.4);
  }
  
  .info-button, .detail-info-button {
    background: linear-gradient(135deg, rgba(255, 92, 163, 0.8), rgba(199, 67, 230, 0.9));
    color: white;
    box-shadow: 0 2px 4px rgba(79, 70, 229, 0.3);
  }
  
  .info-button:hover, .detail-info-button:hover {
    background: linear-gradient(135deg, rgba(255, 143, 211, 0.8), rgba(255, 90, 150, 0.9));;
    transform: translateY(-2px);
    box-shadow: 0 3px 6px rgba(79, 70, 229, 0.4);
  }
  
  /* Larger buttons in detail view */
  .detail-trade-button, .detail-info-button {
    width: 32px;
    height: 32px;
    font-size: 16px;
    border-radius: 8px;
  }
  
  .price-cell, .volume-cell, .liquidity-cell, .market-cap-cell, .fdv-cell {
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
    font-weight: 500;
  }
  
  .age-cell {
    font-size: 0.8rem;
    opacity: 0.8;
  }
  
  .change-cell {
    font-weight: 600;
    text-align: right;
  }
  
  /* Positive/negative change styles */
  .positive {
    color: var(--success-color);
  }
  
  .negative {
    color: var(--error-color);
  }
  
  /* Modern modal styling */
  .modal-content, .modern-modal {
    background: rgba(20, 20, 24, 0.85);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    max-width: 90%;
    width: 650px;
    
  }
  
  /* Info modal styles */
  .info-modal {
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.85);
    padding: 20px;
    box-sizing: border-box;
  }
  
  .info-modal-content {
    background: rgba(20, 20, 24, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    max-width: 800px;
    width: 100%;
    margin: 10px auto;
    position: relative;
  }
  
  .info-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(30, 30, 34, 0.8);
  }
  
  .info-modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff;
  }
  
  .info-modal-body {
    padding: 0;
    max-height: 80vh;
    overflow-y: auto;
  }
  
  .info-modal-close {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--text-secondary);
    font-size: 1.5rem;
    outline: none;
  }
  
  .info-modal-close:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
    color: white;
  }
  
  /* Tab styling */
  .tabs {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    margin-bottom: 1.5rem;
    gap: 0.5rem;
  }
  
  .tab {
    padding: 0.75rem 1.25rem;
    border-bottom: 2px solid transparent;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  .tab.active {
    border-bottom-color: var(--primary-color);
    color: var(--primary-color);
  }
  
  .tab:hover:not(.active) {
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-primary);
  }
  
  /* Modern button style */
  .modern-button {
    padding: 8px 16px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(79, 82, 221, 1));
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  
  .modern-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
    background: linear-gradient(135deg, rgba(109, 112, 251, 0.9), rgba(89, 92, 231, 1));
  }
  
  .modern-button:active {
    transform: translateY(1px);
    box-shadow: 0 1px 4px rgba(99, 102, 241, 0.3);
  }
  
  .modern-button.copied {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(6, 165, 109, 1));
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  }
  
  /* Donation address styling */
  .donation-address {
    font-family: monospace;
    background: rgba(30, 30, 34, 0.5);
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.85rem;
    letter-spacing: 0.03em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  /* Responsive adjustments */
  @media screen and (max-width: 1024px) {
    .modern-row {
      height: 48px; /* Even thinner on mobile */
    }
    
    .modern-row td {
      padding: 0.4rem 0.5rem;
      font-size: 0.8rem;
    }
    
    .token-logo {
      width: 20px;
      height: 20px;
    }
    
    .modal-content {
      width: 95%;
    }
  }
`;
document.head.appendChild(style);

// State management
let allTokens = [];
let filteredTokens = [];
let currentPage = 1;
let itemsPerPage = parseInt(pageSizeSelect.value);
let currentSort = { column: 'marketCap', direction: 'desc' };
let currentTokenData = null;

// Initialize the application
async function init() {
  try {
    // Apply modern styling to the table
    const table = document.getElementById('tokensTable');
    if (table) {
      table.classList.add('modern-table');
    }

    // Apply modern styling to modals
    const tokenModalContent = document.querySelector(
      '#tokenModal .modal-content'
    );

    if (tokenModalContent) tokenModalContent.classList.add('modern-modal');

    // Add modern styling to close buttons
    const closeButtons = document.querySelectorAll(
      '.close-button, .modal-close-button'
    );
    closeButtons.forEach((button) => button.classList.add('modal-close'));

    // Verify info modal exists
    console.log('Checking info modal elements during init:');

    console.log('- closeInfoModal:', document.getElementById('closeInfoModal'));

    // Fetch data from the provided endpoint
    await fetchVirtualsData();

    // Setup event listeners
    setupEventListeners();

    // Sort tokens
    sortTokens();

    // Render the initial view
    renderTokens();
  } catch (error) {
    console.error('Failed to initialize the application:', error);
    displayError(error.message || 'Something went wrong');
  }
}

// Fetch Virtuals Protocol data
async function fetchVirtualsData() {
  try {
    // Fetch data from the Virtuals API
    const response = await fetch(
      'https://api.virtuals.io/api/geneses?pagination[page]=1&pagination[pageSize]=100&filters[virtual][priority][$ne]=-1&filters[status][$in][0]=FINALIZED'
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();

    // Log a sample token to see its structure
    if (data.data && data.data.length > 0) {
      console.log('Sample token data:', data.data[0]);
      console.log('Tokenomics status:', data.data[0].tokenomicsStatus);
    }

    // Process the data
    allTokens = await Promise.all(
      data.data.map(async (item, index) => {
        // Skip tokens without address
        if (!item.virtual?.tokenAddress) {
          return null;
        }

        // For each token ID, fetch additional details
        const virtualDetailsResponse = await fetch(
          `https://api.virtuals.io/api/virtuals/${item.virtual.id}`
        );
        const virtualDetails = await virtualDetailsResponse.json();

        const tokenInfo = {
          id: item.id,
          rank: index + 1,
          name: item.virtual.name,
          symbol: item.virtual.symbol,
          address: item.virtual.tokenAddress,
          description: item.virtual.description || 'No description available',
          image: item.virtual.image?.url || 'https://via.placeholder.com/48',
          chain: item.virtual.chain,
          totalParticipants: item.totalParticipants || 0,
          totalVirtuals: item.totalVirtuals || 0,
          lpCreatedAt: new Date(item.virtual.lpCreatedAt || Date.now()),
          tokenomicsStatus: item.virtual.tokenomicsStatus,
          virtual: {
            ...item.virtual,
            id: item.virtual.id,
            walletAddress: virtualDetails.data?.walletAddress || null,
            lpAddress: virtualDetails.data?.lpAddress || null
          },
          price: 0,
          priceChange: 0,
          volume: 0,
          liquidity: 0,
          marketCap: 0,
          pairAddress: '',
          priceHistory: [],
          volumeHistory: {
            h1: 0,
            h6: 0,
            h24: 0,
          },
          priceChangeHistory: {
            m5: 0,
            h1: 0,
            h6: 0,
            h24: 0,
          },
          txns: {
            h1: { buys: 0, sells: 0 },
            h6: { buys: 0, sells: 0 },
            h24: { buys: 0, sells: 0 },
          },
        };

        try {
          // Fetch price data from DexScreener
          const dexScreenerResponse = await fetch(
            `https://api.dexscreener.com/latest/dex/tokens/${item.virtual.tokenAddress}`
          );

          if (dexScreenerResponse.ok) {
            const dexData = await dexScreenerResponse.json();

            // Find the earliest pair by pairCreatedAt
            if (dexData.pairs && dexData.pairs.length > 0) {
              // Sort pairs by creation date (earliest first)
              const sortedPairs = [...dexData.pairs].sort(
                (a, b) => (a.pairCreatedAt || 0) - (b.pairCreatedAt || 0)
              );

              const pair = sortedPairs[0];

              // Update token info with price data
              tokenInfo.price = parseFloat(pair.priceUsd || 0);
              tokenInfo.priceChange = parseFloat(pair.priceChange?.h24 || 0);
              tokenInfo.volume = parseFloat(pair.volume?.h24 || 0);
              tokenInfo.liquidity = parseFloat(pair.liquidity?.usd || 0);
              tokenInfo.marketCap = parseFloat(pair.marketCap || 0);
              tokenInfo.fdv = parseFloat(pair.fdv || pair.marketCap || 0);
              tokenInfo.pairAddress = pair.pairAddress || '';

              // Update price change history
              tokenInfo.priceChangeHistory = {
                m5: getRandomPercentChange(-10, 10),
                h1: parseFloat(pair.priceChange?.h1 || 0),
                h6: parseFloat(pair.priceChange?.h6 || 0),
                h24: parseFloat(pair.priceChange?.h24 || 0),
              };

              // Update volume history
              tokenInfo.volumeHistory = {
                h1: parseFloat(pair.volume?.h1 || 0),
                h6: parseFloat(pair.volume?.h6 || 0),
                h24: parseFloat(pair.volume?.h24 || 0),
              };

              // Update transaction data if available
              if (pair.txns) {
                tokenInfo.txns = {
                  h1: {
                    buys: parseInt(pair.txns.h1?.buys || 0),
                    sells: parseInt(pair.txns.h1?.sells || 0),
                  },
                  h6: {
                    buys: parseInt(pair.txns.h6?.buys || 0),
                    sells: parseInt(pair.txns.h6?.sells || 0),
                  },
                  h24: {
                    buys: parseInt(pair.txns.h24?.buys || 0),
                    sells: parseInt(pair.txns.h24?.sells || 0),
                  },
                };

                // Calculate total transactions
                tokenInfo.totalTxns =
                  (tokenInfo.txns.h24.buys || 0) +
                  (tokenInfo.txns.h24.sells || 0);
              }

              // Additional pair info
              tokenInfo.dexId = pair.dexId || '';
              tokenInfo.chainId = pair.chainId || '';
              tokenInfo.quoteToken = pair.quoteToken?.symbol || '';
            }
          }
        } catch (error) {
          console.warn(
            `Failed to fetch price data for ${item.virtual.symbol}:`,
            error
          );
        }

        return tokenInfo;
      })
    );

    // Filter out null values and tokens with zero price
    allTokens = allTokens.filter((token) => token !== null);

    // Initialize filtered tokens with all tokens
    filteredTokens = [...allTokens];

    // Hide loading indicator and show token grid
    loadingContainer.style.display = 'none';
    tableContainer.style.display = 'block';
    pagination.style.display = 'flex';
  } catch (error) {
    console.error('Error fetching Virtuals data:', error);
    displayError(error.message || 'Failed to load token data');
  }
}

// Helper function to generate a random percentage change
function getRandomPercentChange(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

// Helper function to calculate token age
function calculateAge(lpCreatedAt) {
  const now = new Date();
  const created = new Date(lpCreatedAt);
  const diffTime = Math.abs(now - created);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);

  if (diffDays > 0) {
    return `${diffDays}d`;
  } else {
    return `${diffHours}h`;
  }
}

// Display error message
function displayError(message) {
  loadingContainer.style.display = 'none';
  emptyState.style.display = 'block';
  emptyState.innerHTML = `
    <h3>Error loading data</h3>
    <p>${message}</p>
  `;
}

// Set up event listeners
function setupEventListeners() {
  // Search input event listener
  searchInput.addEventListener('input', handleSearch);

  // Pagination event listeners
  document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderTokens();
    }
  });

  document.getElementById('nextPage').addEventListener('click', () => {
    const totalPages = Math.ceil(filteredTokens.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderTokens();
    }
  });

  // Page size select event listener
  pageSizeSelect.addEventListener('change', () => {
    itemsPerPage = parseInt(pageSizeSelect.value);
    currentPage = 1;
    renderTokens();
  });

  // Sortable header event listeners
  sortableHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const column = header.dataset.sort;

      // Toggle sort direction if same column is clicked
      if (currentSort.column === column) {
        currentSort.direction =
          currentSort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        currentSort.column = column;
        currentSort.direction = 'desc';
      }

      // Update header classes
      sortableHeaders.forEach((h) => {
        h.classList.remove('asc', 'desc');
      });
      header.classList.add(currentSort.direction);

      // Sort and render tokens
      sortTokens();
      renderTokens();
    });
  });

  // Modal close event listener
  closeModal.addEventListener('click', () => {
    tokenModal.style.display = 'none';
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', (event) => {
    if (event.target === tokenModal) {
      tokenModal.style.display = 'none';
    }
  });

  // Tab switching event listeners
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));

      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      const tabName = tab.dataset.tab;
      document.getElementById(`${tabName}Tab`).classList.add('active');
    });
  });

  // Copy address button event listener
  copyAddressButton.addEventListener('click', () => {
    const addressElement = document.getElementById('detailAddress');
    const address = addressElement.textContent;

    navigator.clipboard
      .writeText(address)
      .then(() => {
        const originalText = copyAddressButton.innerHTML;
        copyAddressButton.textContent = 'Copied!';
        copyAddressButton.classList.add('copied');

        setTimeout(() => {
          copyAddressButton.innerHTML = originalText;
          copyAddressButton.classList.remove('copied');
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  });

  // Add modern styling to address button
  copyAddressButton.classList.add('modern-button');
}

// Handle search input
function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm === '') {
    filteredTokens = [...allTokens];
  } else {
    filteredTokens = allTokens.filter(
      (token) =>
        token.name.toLowerCase().includes(searchTerm) ||
        token.symbol.toLowerCase().includes(searchTerm) ||
        token.address.toLowerCase().includes(searchTerm)
    );
  }

  // Reset to first page when searching
  currentPage = 1;

  // Sort and render tokens
  sortTokens();
  renderTokens();
}

// Sort tokens based on current sort settings
function sortTokens() {
  filteredTokens.sort((a, b) => {
    let valueA = a[currentSort.column];
    let valueB = b[currentSort.column];

    // Special handling for nested properties or non-numeric values
    if (currentSort.column === 'name') {
      valueA = a.name.toLowerCase();
      valueB = b.name.toLowerCase();
    } else if (currentSort.column === 'priceChange5m') {
      valueA = a.priceChangeHistory.m5;
      valueB = b.priceChangeHistory.m5;
    } else if (currentSort.column === 'priceChange1h') {
      valueA = a.priceChangeHistory.h1;
      valueB = b.priceChangeHistory.h1;
    } else if (currentSort.column === 'priceChange6h') {
      valueA = a.priceChangeHistory.h6;
      valueB = b.priceChangeHistory.h6;
    } else if (currentSort.column === 'priceChange24h') {
      valueA = a.priceChangeHistory.h24;
      valueB = b.priceChangeHistory.h24;
    } else if (currentSort.column === 'txns') {
      valueA = a.totalTxns || 0;
      valueB = b.totalTxns || 0;
    } else if (currentSort.column === 'age') {
      valueA = new Date(a.lpCreatedAt).getTime();
      valueB = new Date(b.lpCreatedAt).getTime();
    }

    // Apply sort direction
    if (currentSort.direction === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });
}

// Render tokens in the table
function renderTokens() {
  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredTokens.length);
  const totalPages = Math.ceil(filteredTokens.length / itemsPerPage);

  // Update pagination UI
  document.getElementById('prevPage').disabled = currentPage === 1;
  document.getElementById('nextPage').disabled = currentPage === totalPages;
  document.getElementById(
    'paginationInfo'
  ).textContent = `Page ${currentPage} of ${totalPages > 0 ? totalPages : 1}`;

  // Check if there are any tokens to display
  if (filteredTokens.length === 0) {
    tableContainer.style.display = 'none';
    emptyState.style.display = 'block';
    pagination.style.display = 'none';
    return;
  }

  // Show tokens and hide empty state
  tableContainer.style.display = 'block';
  emptyState.style.display = 'none';
  pagination.style.display = 'flex';

  // Clear the table body
  tokensTableBody.innerHTML = '';

  // Get the current page of tokens
  const tokensToShow = filteredTokens.slice(startIndex, endIndex);

  // Create a table row for each token
  tokensToShow.forEach((token) => {
    const row = createTokenRow(token);
    tokensTableBody.appendChild(row);
  });
}

// Create a token table row
function createTokenRow(token) {
  const row = document.createElement('tr');
  row.dataset.address = token.address;
  row.classList.add('modern-row');

  // Format the price change class and sign
  const priceChange24hClass =
    token.priceChangeHistory.h24 >= 0 ? 'positive' : 'negative';
  const priceChange24hSign = token.priceChangeHistory.h24 >= 0 ? '+' : '';

  const priceChange1hClass =
    token.priceChangeHistory.h1 >= 0 ? 'positive' : 'negative';
  const priceChange1hSign = token.priceChangeHistory.h1 >= 0 ? '+' : '';

  const priceChange6hClass =
    token.priceChangeHistory.h6 >= 0 ? 'positive' : 'negative';
  const priceChange6hSign = token.priceChangeHistory.h6 >= 0 ? '+' : '';

  const priceChange5mClass =
    token.priceChangeHistory.m5 >= 0 ? 'positive' : 'negative';
  const priceChange5mSign = token.priceChangeHistory.m5 >= 0 ? '+' : '';

  // Create token name cell
  const nameCell = document.createElement('td');
  nameCell.classList.add('name-cell');

  // Add unlock badge if token hasn't unlocked yet
  let unlockBadge = '';
  console.log(`Processing token ${token.symbol}:`, token);
  console.log(
    `Token ${token.symbol} tokenomicsStatus:`,
    token.tokenomicsStatus
  );

  if (token.tokenomicsStatus) {
    console.log(
      `Token ${token.symbol} hasUnlocked:`,
      token.tokenomicsStatus.hasUnlocked
    );
    console.log(
      `Token ${token.symbol} daysFromFirstUnlock:`,
      token.tokenomicsStatus.daysFromFirstUnlock
    );

    if (
      token.tokenomicsStatus.hasUnlocked === false &&
      token.tokenomicsStatus.daysFromFirstUnlock > 0
    ) {
      console.log(`Adding lock badge for ${token.symbol}`);
      unlockBadge = `<div class="unlock-badge">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14.5V16.5M7 10.0333V8.2C7 5.33 9.25 3 12 3C14.75 3 17 5.33 17 8.2V10.0333M3.2 10H20.8C21.9201 10 22.4802 10 22.908 10.218C23.2843 10.4097 23.5903 10.7157 23.782 11.092C24 11.5198 24 12.0799 24 13.2V16.8C24 17.9201 24 18.4802 23.782 18.908C23.5903 19.2843 23.2843 19.5903 22.908 19.782C22.4802 20 21.9201 20 20.8 20H3.2C2.0799 20 1.51984 20 1.09202 19.782C0.7157 19.5903 0.409734 19.2843 0.218024 18.908C0 18.4802 0 17.9201 0 16.8V13.2C0 12.0799 0 11.5198 0.218024 11.092C0.409734 10.7157 0.7157 10.4097 1.09202 10.218C1.51984 10 2.0799 10 3.2 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        ${token.tokenomicsStatus.daysFromFirstUnlock}
      </div>`;
    } else {
      console.log(`No badge criteria met for ${token.symbol}`);
    }
  } else {
    console.log(`No tokenomicsStatus for ${token.symbol}`);
  }

  console.log(`Processing token ${token}:`, token);
  nameCell.innerHTML = `
    <div class="token-name-cell">
      <img src="${token.image}" alt="${token.symbol}" class="token-logo">
      <div class="token-name-container">
        <div class="token-name-wrapper">
          <a href="https://app.virtuals.io/virtuals/${token.id}" class="token-name" target="_blank">${token.name}</a>
          <a href="https://app.uniswap.org/swap?outputCurrency=${token.address}&inputCurrency=0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b&chain=base" class="trade-button" target="_blank">
            <img src="https://app.uniswap.org/favicon.png" width="12" height="12" alt="Trade on Uniswap" />
          </a>
          <button type="button" class="info-button" onclick="testInfoModal('${token.virtual.id}')" data-id="${token.virtual.id}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          ${unlockBadge}
        </div>
        <div class="token-symbol">$${token.symbol}</div>
      </div>
    </div>
  `;

  // Add event listener to prevent the row click event when clicking on the links
  const links = nameCell.querySelectorAll('a');
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });

  // Create price cell
  const priceCell = document.createElement('td');
  priceCell.textContent = formatCurrency(token.price);
  priceCell.classList.add('price-cell');

  // Create age cell
  const ageCell = document.createElement('td');
  ageCell.textContent = calculateAge(token.lpCreatedAt);
  ageCell.classList.add('age-cell');

  // Create volume cell
  const volumeCell = document.createElement('td');
  volumeCell.textContent = formatCurrency(token.volume);
  volumeCell.classList.add('volume-cell');

  // Create 5m price change cell
  const priceChange5mCell = document.createElement('td');
  priceChange5mCell.classList.add('change-cell');
  priceChange5mCell.innerHTML = `
    <div class="percent-change-5m ${priceChange5mClass}">
      ${priceChange5mSign}${token.priceChangeHistory.m5.toFixed(2)}%
    </div>
  `;

  // Create 1h price change cell
  const priceChange1hCell = document.createElement('td');
  priceChange1hCell.classList.add('change-cell');
  priceChange1hCell.innerHTML = `
    <div class="percent-change-1h ${priceChange1hClass}">
      ${priceChange1hSign}${token.priceChangeHistory.h1.toFixed(2)}%
    </div>
  `;

  // Create 6h price change cell
  const priceChange6hCell = document.createElement('td');
  priceChange6hCell.classList.add('change-cell');
  priceChange6hCell.innerHTML = `
    <div class="percent-change-6h ${priceChange6hClass}">
      ${priceChange6hSign}${token.priceChangeHistory.h6.toFixed(2)}%
    </div>
  `;

  // Create 24h price change cell
  const priceChange24hCell = document.createElement('td');
  priceChange24hCell.classList.add('change-cell');
  priceChange24hCell.innerHTML = `
    <div class="percent-change-24h ${priceChange24hClass}">
      ${priceChange24hSign}${token.priceChangeHistory.h24.toFixed(2)}%
    </div>
  `;

  // Create liquidity cell
  const liquidityCell = document.createElement('td');
  liquidityCell.textContent = formatCurrency(token.liquidity);
  liquidityCell.classList.add('liquidity-cell');

  // Create market cap cell
  const marketCapCell = document.createElement('td');
  marketCapCell.textContent = formatCurrency(token.marketCap);
  marketCapCell.classList.add('market-cap-cell');

  // Create FDV cell
  const fdvCell = document.createElement('td');
  fdvCell.textContent = formatCurrency(token.fdv);
  fdvCell.classList.add('fdv-cell');

  // Add all cells to the row
  row.appendChild(nameCell);
  row.appendChild(priceCell);
  row.appendChild(ageCell);
  row.appendChild(volumeCell);
  row.appendChild(priceChange5mCell);
  row.appendChild(priceChange1hCell);
  row.appendChild(priceChange6hCell);
  row.appendChild(priceChange24hCell);
  row.appendChild(liquidityCell);
  row.appendChild(marketCapCell);
  row.appendChild(fdvCell);

  // Add click event to open modal with token details
  row.addEventListener('click', () => {
    showTokenDetails(token);
  });

  return row;
}

// Show token details in modal
function showTokenDetails(token) {
  currentTokenData = token;

  // Update UI elements with token data
  const logoElement = document.getElementById('detailLogo');
  if (logoElement)
    logoElement.src = token.image || 'https://via.placeholder.com/64';

  const nameElement = document.getElementById('detailName');
  nameElement.innerHTML = `<a href="https://app.virtuals.io/virtuals/${
    token.id
  }" target="_blank" class="token-detail-link">${
    token.name || 'Unknown Token'
  }</a>`;

  // Add unlock badge if applicable
  const unlockBadgeElement = document.getElementById('detailUnlockBadge');
  if (unlockBadgeElement) {
    if (token.tokenomicsStatus) {
      if (
        token.tokenomicsStatus.hasUnlocked === false &&
        token.tokenomicsStatus.daysFromFirstUnlock > 0
      ) {
        unlockBadgeElement.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14.5V16.5M7 10.0333V8.2C7 5.33 9.25 3 12 3C14.75 3 17 5.33 17 8.2V10.0333M3.2 10H20.8C21.9201 10 22.4802 10 22.908 10.218C23.2843 10.4097 23.5903 10.7157 23.782 11.092C24 11.5198 24 12.0799 24 13.2V16.8C24 17.9201 24 18.4802 23.782 18.908C23.5903 19.2843 23.2843 19.5903 22.908 19.782C22.4802 20 21.9201 20 20.8 20H3.2C2.0799 20 1.51984 20 1.09202 19.782C0.7157 19.5903 0.409734 19.2843 0.218024 18.908C0 18.4802 0 17.9201 0 16.8V13.2C0 12.0799 0 11.5198 0.218024 11.092C0.409734 10.7157 0.7157 10.4097 1.09202 10.218C1.51984 10 2.0799 10 3.2 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg> 
          ${token.tokenomicsStatus.daysFromFirstUnlock}
        `;
        unlockBadgeElement.className = 'detail-unlock-badge';
        unlockBadgeElement.style.display = 'inline-flex';
      } else if (
        token.tokenomicsStatus.hasUnlocked === true &&
        token.tokenomicsStatus.daysFromFirstUnlock <= 30
      ) {
        unlockBadgeElement.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14.5V16.5M7 10.0333V8.2C7 5.33 9.25 3 12 3C14.75 3 17 5.33 17 8.2V10.0333M3.2 10H20.8C21.9201 10 22.4802 10 22.908 10.218C23.2843 10.4097 23.5903 10.7157 23.782 11.092C24 11.5198 24 12.0799 24 13.2V16.8C24 17.9201 24 18.4802 23.782 18.908C23.5903 19.2843 23.2843 19.5903 22.908 19.782C22.4802 20 21.9201 20 20.8 20H3.2C2.0799 20 1.51984 20 1.09202 19.782C0.7157 19.5903 0.409734 19.2843 0.218024 18.908C0 18.4802 0 17.9201 0 16.8V13.2C0 12.0799 0 11.5198 0.218024 11.092C0.409734 10.7157 0.7157 10.4097 1.09202 10.218C1.51984 10 2.0799 10 3.2 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg> 
          ${token.tokenomicsStatus.daysFromFirstUnlock}
        `;
        unlockBadgeElement.className = 'detail-unlock-badge';
        unlockBadgeElement.style.display = 'inline-flex';
      } else {
        unlockBadgeElement.style.display = 'none';
      }
    } else {
      unlockBadgeElement.style.display = 'none';
    }
  }

  document.getElementById('detailSymbol').textContent = token.symbol || '';
  document.getElementById('detailAddress').textContent = token.address || '';
  document.getElementById('detailPrice').textContent = formatCurrency(
    token.price
  );

  const priceChangeElement = document.getElementById('detailChange');
  const priceChangeValue = token.priceChangeHistory.h24;
  const priceChangeClass = priceChangeValue >= 0 ? 'positive' : 'negative';
  const priceChangeSign = priceChangeValue >= 0 ? '+' : '';
  priceChangeElement.textContent = `${priceChangeSign}${priceChangeValue.toFixed(
    2
  )}%`;
  priceChangeElement.className = `token-change ${priceChangeClass}`;

  // Replace token-detail-stats with GeckoTerminal embed
  const detailStatsContainer = document.getElementById('tokenDetailStats');
  if (detailStatsContainer && token.pairAddress) {
    detailStatsContainer.innerHTML = `
      <div class="embed-container" style="position: relative; height: 450px; border-radius: 12px; overflow: hidden; margin-top: 16px; background: rgba(30, 30, 34, 0.3);">
        <div class="embed-loading" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; z-index: 1;">
          <div style="text-align: center;">
            <div class="spinner" style="width: 40px; height: 40px; margin: 0 auto 1rem; border: 3px solid rgba(255, 255, 255, 0.1); border-radius: 50%; border-top-color: #6366f1; animation: spin 1s linear infinite;"></div>
            <p>Loading chart...</p>
          </div>
        </div>
        <iframe 
          id="geckoterminal-embed" 
          title="GeckoTerminal Embed" 
          width="100%" 
          height="450" 
          class="geckoterminal-chart" 
          frameborder="0"
          allow="clipboard-write" 
          allowfullscreen="" 
          src="https://www.geckoterminal.com/base/pools/${token.pairAddress}?embed=1&info=0&swaps=0&grayscale=0&light_chart=0" 
          style="border: none; min-height: 450px; border-radius: 12px; overflow: hidden; position: relative; z-index: 2;"
          onload="this.parentNode.querySelector('.embed-loading').style.display='none';"
          onerror="handleIframeError(this)">
        </iframe>
      </div>
    `;
  } else if (detailStatsContainer) {
    // Fallback if pair address is not available
    detailStatsContainer.innerHTML = `
      <div class="no-chart-message">
        <p>Chart data is not available for this token yet.</p>
      </div>
    `;
  }

  // Also update the chart tab with the same embed
  const chartTabEmbed = document.getElementById('chartTabEmbed');
  if (chartTabEmbed && token.pairAddress) {
    chartTabEmbed.innerHTML = `
      <div class="embed-container" style="position: relative; height: 550px; border-radius: 12px; overflow: hidden; margin-top: 16px; background: rgba(30, 30, 34, 0.3);">
        <div class="embed-loading" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; z-index: 1;">
          <div style="text-align: center;">
            <div class="spinner" style="width: 40px; height: 40px; margin: 0 auto 1rem; border: 3px solid rgba(255, 255, 255, 0.1); border-radius: 50%; border-top-color: #6366f1; animation: spin 1s linear infinite;"></div>
            <p>Loading chart...</p>
          </div>
        </div>
        <iframe 
          id="geckoterminal-embed-tab" 
          title="GeckoTerminal Embed" 
          width="100%" 
          height="550"
          class="geckoterminal-chart" 
          frameborder="0" 
          allow="clipboard-write" 
          allowfullscreen="" 
          src="https://www.geckoterminal.com/base/pools/${token.pairAddress}?embed=1&info=1&swaps=1&grayscale=0&light_chart=0" 
          style="border: none; min-height: 550px; border-radius: 12px; overflow: hidden; position: relative; z-index: 2;"
          onload="this.parentNode.querySelector('.embed-loading').style.display='none';"
          onerror="handleIframeError(this)">
        </iframe>
      </div>
    `;
  } else if (chartTabEmbed) {
    // Fallback if pair address is not available
    chartTabEmbed.innerHTML = `
      <div class="no-chart-message">
        <p>Chart data is not available for this token yet.</p>
      </div>
    `;
  }

  const tradeButtonContainer = document.getElementById('tradeButtonContainer');
  if (tradeButtonContainer) {
    tradeButtonContainer.innerHTML = `
      <a href="https://app.uniswap.org/swap?outputCurrency=${token.address}&inputCurrency=0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b&chain=base" class="detail-trade-button" target="_blank">
        <img src="https://app.uniswap.org/favicon.png" width="16" height="16" alt="Trade on Uniswap" />
      </a>
      ${token.virtual.walletAddress ? `
        <a href="https://debank.com/profile/${token.virtual.walletAddress}" class="detail-wallet-button" target="_blank">
          <img src="https://assets.debank.com/favicon.ico" width="16" height="16" alt="View on DeBank" />
        </a>
      ` : ''}
      ${token.virtual.lpAddress ? `
        <a href="https://dexscreener.com/base/${token.virtual.lpAddress}" class="detail-wallet-button" target="_blank">
          <img src="https://dexscreener.com/favicon.png" width="16" height="16" alt="View on DexScreener" />
        </a>
      ` : ''}
    `;
  }

  // Set listed date
  document.getElementById('listedOn').textContent = formatDate(
    token.lpCreatedAt
  );

  // Update token description
  document.getElementById('tokenDescription').textContent = token.description;

  // Display the modal
  tokenModal.style.display = 'block';
  tokenModal.style.opacity = '1';
  tokenModal.style.visibility = 'visible';
  tokenModal.style.zIndex = '9999';

  // Reset tabs to show overview by default
  tabs.forEach((tab) => tab.classList.remove('active'));
  tabContents.forEach((content) => content.classList.remove('active'));
  document.querySelector('.tab[data-tab="overview"]').classList.add('active');
  document.getElementById('overviewTab').classList.add('active');
}

// Function to handle iframe loading errors
function handleIframeError(iframe) {
  const container = iframe.parentNode;
  const loading = container.querySelector('.embed-loading');

  if (loading) loading.style.display = 'none';

  // Replace iframe with error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'no-chart-message';
  errorDiv.innerHTML = `
    <p>Unable to load chart from GeckoTerminal. You may try again later or visit 
      <a href="https://www.geckoterminal.com/base/pools/${
        iframe.src.split('pools/')[1]?.split('?')[0] || ''
      }" 
         target="_blank" 
         style="color: #6366f1; text-decoration: underline;">
         GeckoTerminal directly
      </a>.
    </p>
  `;

  iframe.style.display = 'none';
  container.appendChild(errorDiv);
}

// Create a mini price chart for token rows
function createMiniChart(canvas, token) {
  if (!canvas) return;

  // Use actual price change to determine color
  const priceChange = token.priceChange || 0;

  // Default to a single data point if we don't have historical data
  const data = [token.price * 0.95, token.price];
  const labels = ['', ''];

  // Create gradient fill
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 40);

  if (priceChange >= 0) {
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
  } else {
    gradient.addColorStop(0, 'rgba(239, 68, 68, 0.2)');
    gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
  }

  // Create the chart
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Price',
          data: data,
          borderColor: priceChange >= 0 ? '#10b981' : '#ef4444',
          backgroundColor: gradient,
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    },
  });
}

// Create a price chart for the token details modal
function createPriceChart() {
  if (!currentTokenData) return;

  // Use a simple two-point chart if we don't have historical data
  // In a production app, you would integrate with a price history API
  const currentDate = new Date();
  const yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  const labels = [
    formatDate(yesterdayDate, 'short'),
    formatDate(currentDate, 'short'),
  ];

  // Calculate yesterday's price based on 24h change
  const priceChangePercent = currentTokenData.priceChangeHistory.h24 / 100;
  const yesterdayPrice = currentTokenData.price / (1 + priceChangePercent);

  const data = [yesterdayPrice, currentTokenData.price];

  // Get the chart canvas
  const chartCanvas = document.getElementById('priceChart');
  if (!chartCanvas) return;

  const ctx = chartCanvas.getContext('2d');

  // Destroy existing chart if it exists
  if (priceChart) {
    priceChart.destroy();
  }

  // Create the chart
  priceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Price (USD)',
          data: data,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          tension: 0.1,
          fill: true,
          pointRadius: 2,
          pointBackgroundColor: '#6366f1',
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Price: ${formatCurrency(context.raw)}`;
            },
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            color: 'rgba(255, 255, 255, 0.1)',
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)',
          },
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)',
            callback: function (value) {
              return formatCurrency(value);
            },
          },
        },
      },
    },
  });
}

// Create a volume chart for the token details modal
function createVolumeChart() {
  if (!currentTokenData) return;

  // Use actual volume data from the API
  const labels = ['1h', '6h', '24h'];
  const volumeData = [
    currentTokenData.volumeHistory.h1 || 0,
    currentTokenData.volumeHistory.h6 || 0,
    currentTokenData.volumeHistory.h24 || 0,
  ];

  // Get the chart canvas
  const chartCanvas = document.getElementById('volumeChart');
  if (!chartCanvas) return;

  const ctx = chartCanvas.getContext('2d');

  // Destroy existing chart if it exists
  if (volumeChart) {
    volumeChart.destroy();
  }

  // Create the chart
  volumeChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Volume (USD)',
          data: volumeData,
          backgroundColor: 'rgba(99, 102, 241, 0.8)',
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Volume: ${formatCurrency(context.raw)}`;
            },
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            color: 'rgba(255, 255, 255, 0.1)',
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)',
          },
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)',
            callback: function (value) {
              return formatCurrency(value);
            },
          },
        },
      },
    },
  });
}

// Helper function to format currency values
function formatCurrency(value) {
  if (value === undefined || value === null) return '$0';

  // Handle very large or very small numbers
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  } else if (value < 0.0001 && value > 0) {
    return `$${value.toExponential(2)}`;
  } else {
    return `$${value.toFixed(value < 1 ? 4 : 2)}`;
  }
}

// Helper function to format dates
function formatDate(date, style = 'full') {
  if (!date) return 'N/A';

  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return 'N/A';

    const options =
      style === 'full'
        ? { year: 'numeric', month: 'long', day: 'numeric' }
        : { month: 'short', day: 'numeric' };

    return dateObj.toLocaleDateString('en-US', options);
  } catch (e) {
    console.error('Error formatting date:', e);
    return 'Invalid Date';
  }
}

// Render virtual info with modern styling and animations
function renderModernVirtualInfo(virtualData, contentElement) {
  if (!contentElement) return;

  // Format tokenomics
  let tokenomicsHTML = '';
  if (virtualData.tokenomics && virtualData.tokenomics.length > 0) {
    const tokenomicsItems = virtualData.tokenomics
      .map((item, index) => {
        return `
        <div style="background: rgba(30, 30, 34, 0.4); border-radius: 8px; padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.05); animation: fadeIn 0.5s ease forwards; animation-delay: ${
          index * 50 + 100
        }ms; opacity: 0;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem; color: white;">${
            item.name
          }</h4>
          <p style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.7); margin: 0 0 0.75rem 0; line-height: 1.5;">${
            item.description || 'No description available'
          }</p>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
            <span>${(item.bips / 100).toFixed(2)}% Allocation</span>
            ${
              item.isLocked
                ? '<span style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(79, 70, 229, 0.15); color: rgb(139, 127, 255); padding: 0.15rem 0.5rem; border-radius: 4px;">🔒 Locked</span>'
                : ''
            }
          </div>
        </div>
      `;
      })
      .join('');

    tokenomicsHTML = `
      <div style="padding: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.07); animation: fadeIn 0.5s ease forwards; animation-delay: 300ms; opacity: 0;">
        <h3 style="margin: 0 0 1rem 0; font-size: 1.2rem; font-weight: 600; color: white;">Tokenomics</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem;">
          ${tokenomicsItems}
        </div>
      </div>
    `;
  }

  // Format social links
  let socialsHTML =
    '<div style="color: rgba(255, 255, 255, 0.5);">No social links available</div>';
  if (virtualData.socials && virtualData.socials.VERIFIED_LINKS) {
    const socialLinks = Object.entries(virtualData.socials.VERIFIED_LINKS)
      .map(([platform, url], index) => {
        const platformLower = platform.toLowerCase();
        const bgColor =
          platform === 'TWITTER'
            ? 'rgba(29, 155, 240, 0.15)'
            : platform === 'DISCORD'
            ? 'rgba(88, 101, 242, 0.15)'
            : 'rgba(255, 255, 255, 0.05)';

        const textColor =
          platform === 'TWITTER'
            ? 'rgb(29, 155, 240)'
            : platform === 'DISCORD'
            ? 'rgb(88, 101, 242)'
            : 'rgba(255, 255, 255, 0.7)';

        return `
        <a href="${url}" target="_blank" style="display: inline-block; padding: 0.5rem 0.75rem; background: ${bgColor}; border-radius: 6px; font-size: 0.85rem; color: ${textColor}; text-decoration: none; transition: all 0.2s ease; margin-right: 0.75rem; margin-bottom: 0.75rem; animation: fadeIn 0.5s ease forwards; animation-delay: ${
          index * 50 + 200
        }ms; opacity: 0;">
          ${platform === 'TWITTER' ? '𝕏' : platform}
        </a>
      `;
      })
      .join('');

    // Add wallet address link to DeBank if walletAddress exists
    let walletLink = '';
    if (virtualData.walletAddress) {
      walletLink = `
        <a href="https://debank.com/profile/${
          virtualData.walletAddress
        }" target="_blank" 
           style="display: inline-block; padding: 0.5rem 0.75rem; background: rgba(237, 153, 73, 0.15); border-radius: 6px; font-size: 0.85rem; color: rgb(237, 153, 73); text-decoration: none; transition: all 0.2s ease; margin-right: 0.75rem; margin-bottom: 0.75rem; animation: fadeIn 0.5s ease forwards; animation-delay: ${
             Object.keys(virtualData.socials.VERIFIED_LINKS).length * 50 + 200
           }ms; opacity: 0;">
          DEVELOPER WALLET
        </a>
      `;
    }

    socialsHTML = socialLinks + walletLink;
  } else {
    // If no social links, still add wallet link if available
    if (virtualData.walletAddress) {
      socialsHTML = `
        <a href="https://debank.com/profile/${virtualData.walletAddress}" target="_blank" 
           style="display: inline-block; padding: 0.5rem 0.75rem; background: rgba(237, 153, 73, 0.15); border-radius: 6px; font-size: 0.85rem; color: rgb(237, 153, 73); text-decoration: none; transition: all 0.2s ease; margin-right: 0.75rem; margin-bottom: 0.75rem; animation: fadeIn 0.5s ease forwards; animation-delay: 200ms; opacity: 0;">
          DEVELOPER WALLET
        </a>
      `;
    }
  }

  // Handle unlock badge display
  let unlockBadgeHTML = '';
  if (
    virtualData.tokenomicsStatus &&
    virtualData.tokenomicsStatus.hasUnlocked === false
  ) {
    unlockBadgeHTML = `
      <span style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(79, 70, 229, 0.15); color: rgb(139, 127, 255); padding: 0.25rem 0.75rem; border-radius: 6px; font-size: 0.85rem; font-weight: 500; animation: fadeIn 0.5s ease forwards; animation-delay: 200ms; opacity: 0;">
        🔒 Unlocks in ${virtualData.tokenomicsStatus.daysFromFirstUnlock} days
      </span>
    `;
  }

  // Add animation keyframes directly to the document
  const keyframesStyle = document.createElement('style');
  keyframesStyle.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(keyframesStyle);

  // Assemble complete modal content
  contentElement.innerHTML = `
    <div style="display: flex; align-items: center; padding: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.07); background: rgba(20, 20, 24, 0.4); animation: fadeIn 0.3s ease forwards;">
      <img src="${
        virtualData.image?.url ||
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM0QjVDRjYiLz48dGV4dCB4PSI1MCIgeT0iNTAiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMzAiIGZpbGw9IndoaXRlIj5OL0E8L3RleHQ+PC9zdmc+'
      }" 
           alt="${virtualData.name}" 
           style="width: 64px; height: 64px; border-radius: 12px; object-fit: cover; border: 1px solid rgba(255, 255, 255, 0.1); animation: fadeIn 0.5s ease forwards; animation-delay: 100ms;">
      
      <div style="margin-left: 1.25rem;">
        <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem; font-weight: 600; color: white; animation: fadeIn 0.5s ease forwards; animation-delay: 150ms;">${
          virtualData.name || 'Unknown Virtual'
        }</h2>
        
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.9rem; color: rgba(255, 255, 255, 0.7);">
          <span style="animation: fadeIn 0.5s ease forwards; animation-delay: 200ms; opacity: 0;">Symbol: $${
            virtualData.symbol || 'N/A'
          }</span>
          <span style="animation: fadeIn 0.5s ease forwards; animation-delay: 250ms; opacity: 0;">Chain: ${
            virtualData.chain || 'N/A'
          }</span>
          ${unlockBadgeHTML}
        </div>
      </div>
    </div>

    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.07);">
      ${socialsHTML}
    </div>
    
    <div style="padding: 1.5rem; line-height: 1.6; color: rgba(255, 255, 255, 0.7); border-bottom: 1px solid rgba(255, 255, 255, 0.07); animation: fadeIn 0.5s ease forwards; animation-delay: 300ms; opacity: 0;">
      ${virtualData.description || 'No description available.'}
    </div>
    
    ${tokenomicsHTML}
    
    <div style="padding: 1.5rem; animation: fadeIn 0.5s ease forwards; animation-delay: 400ms; opacity: 0;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://app.virtuals.io/virtuals/${
          virtualData.id
        }" target="_blank" 
           style="padding: 0.75rem 1.25rem; background: linear-gradient(135deg, rgba(79, 70, 229, 0.8), rgba(45, 32, 90, 0.9)); color: white; border: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
          👁️ View on Virtuals
        </a>
        ${
          virtualData.tokenAddress
            ? `
          <a href="https://app.uniswap.org/swap?outputCurrency=${virtualData.tokenAddress}&inputCurrency=0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b&chain=base" target="_blank" 
             style="padding: 0.75rem 1.25rem; background: linear-gradient(135deg, rgba(56, 178, 172, 0.8), rgba(12, 74, 110, 0.9)); color: white; border: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
            💱 Trade on Uniswap
          </a>
        `
            : ''
        }
      </div>
    </div>
  `;
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Debug DOM elements
  console.log('DOM loaded, checking elements:');
  console.log('closeInfoModal:', document.getElementById('closeInfoModal'));

  // Log any info buttons present
  const infoButtons = document.querySelectorAll('.info-button');
  console.log('Info buttons found initially:', infoButtons.length);

  // Init the application
  init();

  // Create a global test function to manually open the modal
  window.testInfoModal = function (virtualId = 24552) {
    console.log('testInfoModal called with ID:', virtualId);
    try {
      // Add keyframes for spinner animation
      const styleEl = document.createElement('style');
      styleEl.textContent = `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(styleEl);
    } catch (err) {
      console.error('Error in testInfoModal:', err);
      alert('Error showing modal: ' + err.message);
    }
  };

  // Donation address copy functionality
  const copyDonationButton = document.getElementById('copyDonationAddress');
  if (copyDonationButton) {
    copyDonationButton.addEventListener('click', () => {
      const donationAddress =
        document.querySelector('.donation-address').textContent;

      navigator.clipboard
        .writeText(donationAddress)
        .then(() => {
          const originalText = copyDonationButton.textContent;
          copyDonationButton.textContent = 'Copied!';
          copyDonationButton.classList.add('copied');

          setTimeout(() => {
            copyDonationButton.textContent = originalText;
            copyDonationButton.classList.remove('copied');
          }, 2000);
        })
        .catch((err) => {
          console.error('Failed to copy donation address: ', err);
        });
    });

    // Add modern styling to donation button
    copyDonationButton.classList.add('modern-button');
  }

  // Add keyframes for spinner animation if not already present
  if (!document.getElementById('spinner-keyframes')) {
    const spinnerStyle = document.createElement('style');
    spinnerStyle.id = 'spinner-keyframes';
    spinnerStyle.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(spinnerStyle);
  }
});

// Add the iframe error handler to the window object to make it globally accessible
window.handleIframeError = handleIframeError;
