import { Header } from '@/components/header';
import { useCartSore } from '@/stores/cart-store';
import { ScrollView, Text, View } from 'react-native';
import { Product } from '@/components/product';
import { formatCurrency } from '@/utils/data/functions/format-currency';
import { Input } from '@/components/input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from '@/components/button';
import { Feather } from '@expo/vector-icons';
import { LinkButton } from '@/components/link-button';

export default function Cart() {
  const cartSore = useCartSore();

  const total = formatCurrency(
    cartSore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  return (
    <View className="flex-1 pt-16">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView>
        <ScrollView className="p-5">
          <View className="flex-1">
            {cartSore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartSore.products.map(product => (
                  <Product key={product.id} data={product} />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio.
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4 flex-1">
              <Text className="text-white text-xl font-subtitle">Total: </Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>
            <Input placeholder="Informe o endereço de entrega com rua, bairro, CEP, número completo e complemento..." />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="gap-5 p-5">
        <Button>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
