#include <stdio.h>
#include <math.h>
#include <iostream.h>

int main() {
    long double inputNr = 0.845967548976854765487765478675486754786548764587654876548764587655487645876548765478;
    int result[32];
    long double copyN = inputNr;
    int i = 0;
    while (i < 32 && copyN != 0) {
        copyN = copyN * 2;
        result[i] = floor(copyN);
        copyN = copyN - result[i];        
        i++;
        // printf("it %d \r\n", i);
    }

    if (copyN != 0) {
        printf("Error \r\n");
    } else {
        printf("Success %d \r\n", i);
    }

    return 0;
};
    