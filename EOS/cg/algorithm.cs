// A Hello World! program in C#.
using System;
using System.Text;
using System.Security.Cryptography;

namespace HelloWorld
{
    class Hello
    {
        static void Main(string[] args)
        {
            string pubKey = "EOS7QqYDZ3UCiAVBYRGdsfyaEZBGYasxZXqkTM5tAzqYhAEyW3byr";
            // minus 'EOS....' and the first byte after (2 bytes per character)
            string pubKey1 = pubKey.Remove(0, 4);
            // minus 4 bytes at the end
            string pubKey2 = pubKey1.Remove(pubKey1.Length - 2);
            char[] alphabet = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5' };
            SHA256 sha256 = SHA256Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(pubKey2);
            byte[] hash = sha256.ComputeHash(bytes); // Convert the input string to a byte array and compute the hash.
            StringBuilder mappedName = new StringBuilder();
            for (int i = 0; i < alphabet.Length; i++)
            {
                var index = hash[i] % 31; // Take the modulo 31 of each element in the resulted hash as index
                mappedName.Append(alphabet[index]); // use index to select element in aphabet to be our name
            }
            mappedName.Length = 12; // acc name is of 12 characters
            Console.WriteLine(mappedName.ToString());

            // Keep the console window open in debug mode.
            Console.WriteLine("Press any key to exit.");
            Console.ReadKey();
        }
    }
}