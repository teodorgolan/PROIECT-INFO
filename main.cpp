#include <iostream>
#include <fstream>

using namespace std;

int st[4]{0};

struct preparate
{
    int CaloriiProdus = 0;
    int PretProdus = 0;
};

preparate Feluri[13];

int suma = 0;
int calorii = 0;

void init()
{
    ifstream Produs("restaurant.in");

    Produs >> suma;

    Produs >> calorii;

    for (int i = 1; i <= 12; i++)
    {
        Produs >> Feluri[i].PretProdus;
    }

    for (int i = 1; i <= 12; i++)
    {
        Produs >> Feluri[i].CaloriiProdus;
    }

    Produs.close();
}

void tipar()
{
    for (int i = 1; i <= 3; i++)
    {
        cout << st[i] << " ";
    }
    cout << "\n";
}

int valid(int k)
{
    for (int i = 1; i < k; i++)
    {
        if (st[i] == st[k])
        {
            return 0;
        }
    }
    if (k >= 1)
    {
        if (!(st[1] >= 1 && st[1] <= 4))
            return 0;
        if (k >= 2 && !(st[2] > 4 && st[2] <= 9))
            return 0;
        if (k >= 3 && !(st[3] > 9 && st[3] <= 12))
            return 0;
        if (suma < Feluri[st[1]].PretProdus + Feluri[st[2]].PretProdus + Feluri[st[3]].PretProdus)
            return 0;
        if (calorii < Feluri[st[1]].CaloriiProdus + Feluri[st[2]].CaloriiProdus + Feluri[st[3]].CaloriiProdus)
            return 0;
    }
    return 1;
}

void meniu(int k)
{
    for (int i = 1; i <= 12; i++)
    {
        st[k] = i;
        if (valid(k))
        {
            if (k == 3)
            {
                tipar();
            }
            else
            {
                meniu(k + 1);
            }
        }
    }
}

int main()
{
    init();
    meniu(1);

    return 0;
}