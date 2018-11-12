using System;
using System.Text;
using System.Security.Cryptography;
namespace Bluebird.Business.Tools


{
    public static class AddressTools
    {
        public static string eosAccountNamer(string pubKey)
        {
            // minus 'EOS....' and the first byte after (2 bytes per character)
            string pubKey1 = pubKey.Remove(0,4);
            // minus 4 bytes at the end
            string pubKey2 = pubKey1.Remove(pubKey1.Length-2);
            char[] alphabet = { 'a', 'b','c', 'd', 'e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5' };
            SHA256 sha256 = SHA256Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(pubKey2);
            byte[] hash = sha256.ComputeHash(bytes); // Convert the input string to a byte array and compute the hash.
            StringBuilder mappedName = new StringBuilder();
            for (int i=0; i < alphabet.Length; i++){ 
                var index = hash[i] % 31; // Take the modulo 31 of each element in the resulted hash as index
                mappedName.Append(alphabet[index]); // use index to select element in aphabet to be our name
            }
            mappedName.Length = 12; // acc name is of 12 characters
            return mappedName.ToString();
        }
    }
}

