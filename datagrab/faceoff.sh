
# Facinate Testing Data
echo "Testing Data Conversions"
# nic
python facinator.py './nicornot/Testing Data/nic' jpg './nicornotfaces/Testing Data/nic/'
python facinator.py './nicornot/Testing Data/nic' jpeg './nicornotfaces/Testing Data/nic/'
python facinator.py './nicornot/Testing Data/nic' png './nicornotfaces/Testing Data/nic/'
# not
python facinator.py './nicornot/Testing Data/not' jpg './nicornotfaces/Testing Data/not/'
python facinator.py './nicornot/Testing Data/not' jpeg './nicornotfaces/Testing Data/not/'
python facinator.py './nicornot/Testing Data/not' png './nicornotfaces/Testing Data/not/'

# Facinate Training Data
echo "Training Data Conversions"
# nic
python facinator.py './nicornot/Training Data/nic' jpg './nicornotfaces/Training Data/nic/'
python facinator.py './nicornot/Training Data/nic' jpeg './nicornotfaces/Training Data/nic/'
python facinator.py './nicornot/Training Data/nic' png './nicornotfaces/Training Data/nic/'
# not
python facinator.py './nicornot/Training Data/not' jpg './nicornotfaces/Training Data/not/'
python facinator.py './nicornot/Training Data/not' jpeg './nicornotfaces/Training Data/not/'
python facinator.py './nicornot/Training Data/not' png './nicornotfaces/Training Data/not/'
