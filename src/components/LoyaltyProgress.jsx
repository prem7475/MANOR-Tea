import React from 'react';
import { useLoyalty } from '../context/LoyaltyContext';
import { Leaf, Star, Crown } from 'lucide-react';

const LoyaltyProgress = () => {
  const { loyaltyData, getTierBenefits, getTierProgress } = useLoyalty();
  const progress = getTierProgress();
  const benefits = getTierBenefits(progress.currentTier);

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'Bronze Leaf':
        return <Leaf className="w-6 h-6 text-amber-600" />;
      case 'Silver Leaf':
        return <Star className="w-6 h-6 text-gray-400" />;
      case 'Gold Leaf':
        return <Crown className="w-6 h-6 text-yellow-500" />;
      default:
        return <Leaf className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-manorBg to-gray-900 p-6 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-serif text-manorText font-semibold">MANOR Loyalty Club</h3>
        <div className="flex items-center gap-2">
          {getTierIcon(progress.currentTier)}
          <span className="text-manorText font-medium">{progress.currentTier}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span>{loyaltyData.points} Tea Leaves</span>
          <span>{progress.pointsToNextTier} to {progress.nextTier}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-amber-600 to-yellow-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress.progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-manorText font-medium">Your Benefits:</h4>
        <ul className="space-y-1">
          {benefits.benefits.map((benefit, index) => (
            <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="text-xs text-gray-400">
            <div className="font-semibold text-manorText">₹{loyaltyData.totalSpent}</div>
            <div>Total Spent</div>
          </div>
          <div className="text-xs text-gray-400">
            <div className="font-semibold text-manorText">{loyaltyData.reviewsCount}</div>
            <div>Reviews</div>
          </div>
          <div className="text-xs text-gray-400">
            <div className="font-semibold text-manorText">{loyaltyData.accountAge}</div>
            <div>Days Member</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgress;
