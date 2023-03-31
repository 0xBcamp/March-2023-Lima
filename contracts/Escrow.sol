pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Property.sol";
import "./Booking.sol";

contract Escrow {
    Property propertyContract;
    Booking bookingContract;
    IERC20 usdcToken;

    // A mapping that stores the deposited amount (in USDC tokens) for each booking ID
    // Key: Booking ID
    // Value: Amount of USDC tokens held in escrow for the booking
    mapping(uint256 => uint256) public bookingAmounts;
    
    // A mapping that tracks whether the funds for a booking have been released to the property owner
    // Key: Booking ID
    // Value: A boolean flag indicating if the funds have been released (true) or not (false)
    mapping(uint256 => bool) public isBookingPaid;

    constructor(address _propertyContractAddress, address _bookingContractAddress, address _usdcTokenAddress) {
        propertyContract = Property(_propertyContractAddress);
        bookingContract = Booking(_bookingContractAddress);
        usdcToken = IERC20(_usdcTokenAddress);
    }

    /**
     * @dev Stores the deposited amount for a booking in the escrow contract.
     * This function is called by the Booking contract after it has transferred
     * the required USDC tokens to the escrow contract.
     *
     * @param bookingId The ID of the booking associated with the deposited amount.
     * @param amount The amount of USDC tokens deposited for the booking.
     */
    function deposit(uint256 bookingId, uint256 amount) external {
        // Ensure that the booking amount has not been deposited before
        require(bookingAmounts[bookingId] == 0, "Booking amount already deposited");

        // Store the deposited amount for the given booking ID
        bookingAmounts[bookingId] = amount;
    }

    /**
     * @dev Releases the deposited amount for a booking to the property owner.
     * This function transfers the USDC tokens held in the escrow contract for
     * the booking to the property owner's address.
     *
     * @param bookingId The ID of the booking for which the amount should be released.
     */
    function release(uint256 bookingId) external {
        // Ensure that the booking amount has not been released before
        require(!isBookingPaid[bookingId], "Booking amount already released");

        // Get the deposited amount for the given booking ID
        uint256 amount = bookingAmounts[bookingId];

        // Ensure there is a booking amount to release
        require(amount > 0, "No booking amount to release");

        // Get the property ID associated with the booking ID
        uint256 propertyId = bookingContract.getPropertyIdByBookingId(bookingId);

        // Get the property owner's address
        address propertyOwner = propertyContract.getPropertyOwner(propertyId);

        // Ensure the property owner's address is valid
        require(propertyOwner != address(0), "Property owner not found");

        // Transfer USDC tokens from the escrow contract to the property owner
        usdcToken.transfer(propertyOwner, amount);

        // Mark the booking amount as released
        isBookingPaid[bookingId] = true;
    }
}