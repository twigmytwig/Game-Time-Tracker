class WinProcess:
    def __init__(self, name):
        self.name = name

data : str = []

def test_data():
    tempData = "Fallout76.exe"
    tempData2 = "RocketLeague.exe"
    tempData3 = "FortniteClient-Win64-Shipping.exe"
    data.append(tempData2)
    data.append(tempData)
    data.append(tempData3)
    return data