const CardSkeleton3 = () => {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="border flex gap-4 rounded-lg p-4 shadow-sm animate-pulse"
          >
            <div>
              <div className="h-16 w-16 bg-gray-200 rounded-lg mb-4"></div>
            </div>
            <div className="w-full">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="flex justify-end space-x-2">
                <div className="h-8 bg-gray-200 rounded w-20"></div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardSkeleton3
// Sixteen schools. Four groups. Everyone plays everyone in their group, then we pretend chaos is actually organized and march calmly to finals. Let’s do this before someone brings last-minute “my school just arrived” energy.

// ---

// ## GROUP STAGE

// 4 groups of 4 schools.
// Each school plays **3 matches** (round-robin).
// Top **2 schools** from each group qualify for quarterfinals.

// ### **Group A**

// 1. Mabest Academy
// 2. Winning Haven
// 3. Hallmark Secondary
// 4. Federal Government Girls College

// Matches:

// * Mabest Academy vs Winning Haven
// * Mabest Academy vs Hallmark Secondary
// * Mabest Academy vs FGG College
// * Winning Haven vs Hallmark Secondary
// * Winning Haven vs FGG College
// * Hallmark Secondary vs FGG College

// ---

// ### **Group B**

// 1. Oyemekun Grammar School
// 2. Greater Tomorrow College
// 3. High Watermark High School
// 4. Skyfield College

// Matches:

// * Oyemekun vs Greater Tomorrow
// * Oyemekun vs High Watermark
// * Oyemekun vs Skyfield
// * Greater Tomorrow vs High Watermark
// * Greater Tomorrow vs Skyfield
// * High Watermark vs Skyfield

// ---

// ### **Group C**

// 1. Everwining College
// 2. St Francis Academy
// 3. Accord Academy
// 4. Seat of Wisdom College

// Matches:

// * Everwining vs St Francis
// * Everwining vs Accord
// * Everwining vs Seat of Wisdom
// * St Francis vs Accord
// * St Francis vs Seat of Wisdom
// * Accord vs Seat of Wisdom

// ---

// ### **Group D**

// 1. Emplace College
// 2. Aquinas College
// 3. Mabest Elementary
// 4. St Louis N/P School

// Matches:

// * Emplace vs Aquinas
// * Emplace vs Mabest Elementary
// * Emplace vs St Louis
// * Aquinas vs Mabest Elementary
// * Aquinas vs St Louis
// * Mabest Elementary vs St Louis

// ---

// ## KNOCKOUT STAGE

// ### **Quarterfinals**

// (Qualifiers cross groups. Standard, fair, drama-free.)

// * **QF1:** Group A 1st vs Group B 2nd
// * **QF2:** Group B 1st vs Group A 2nd
// * **QF3:** Group C 1st vs Group D 2nd
// * **QF4:** Group D 1st vs Group C 2nd

// ---

// ### **Semifinals**

// * **SF1:** Winner QF1 vs Winner QF3
// * **SF2:** Winner QF2 vs Winner QF4

// ---

// ### **Third Place Match**

// * Loser SF1 vs Loser SF2

// ---

// ### **Final**

// * Winner SF1 vs Winner SF2

// ---

// ## Summary (for sanity)

// * Every school plays **at least 3 games**
// * Clear progression
// * No rematches before knockouts
// * Final + third-place match included
// * No hidden math tricks

// If you want, I can also:

// * Add a **points table format**
// * Fix **match days & time slots**
// * Adapt this for **chess boards, football, or scrabble**
// * Or rewrite it into an **official tournament document** suitable for school admin people who love stamps more than logic

// But this structure itself is solid. No funny business.


// Mabest Academy - 1st position
// Aquinas College - 2nd position
// Emplace College - 3rd position
// Hallmark Secondary - 4th position

// Best female - 





